import 'dotenv/config'
import path from 'node:path';
import express, { Express, Request, Response } from 'express'
import { makePrompt, makeImage } from './models/openai'
import { hfImage } from './models/huggingface'
import { replicateImage } from './models/replicate'

const app: Express = express();
const port = process.env.PORT

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }))
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
/**
 * STATIC RESOURCES
 */
app.use(express.static(path.join(__dirname, 'public')))
app.use('/js', express.static(
    path.join(__dirname, 'public'),
    {
        setHeaders: (res, req, start) => {
            res.set('Content-Type', 'application/javascript')
        }
    }))
// node_modules/@picocss/pico/css/pico.min.css
app.use('/pico', express.static(
    path.join('node_modules', '@picocss', 'pico', 'css'),
    {
        setHeaders: (res, req, start) => {
            res.set('Content-Type', 'text/css')
        }
    }
))
app.use('/htmx', express.static(
    path.join('node_modules', 'htmx.org', 'dist'),
    {
        setHeaders: (res, req, start) => {
            res.set('Content-Type', 'application/javascript')
        }
    }
));

/**
 * VIEW ENGINE
 */
app.set('views', './src/views')
app.set('view engine', 'twig');
app.set('twig options', {
    allowAsync: true,
    strict_variables: false,
})
/**
 * FIRST ROUTE
 */
app.get('/', (req: Request, res: Response) => {
    res.render('base', {
        title: 'Text to Image Generation',
    })
})

app.get('/make-prompt', async (req: Request, res: Response) => {
    const { prompt } = req.query || '';
    
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
    });

    const sendEvent = (data: object) => {
        res.write(`data: ${JSON.stringify(data)}\n\n`);
    }

    if (typeof prompt === 'string') {
        const promptStream = await makePrompt(prompt);
        let newPrompt = ''
        for await (const chunk of promptStream) {
            const chunkSplit = chunk.choices[0]?.delta?.content;
            newPrompt += chunkSplit;
            sendEvent({ promptResponse: chunkSplit });
        }
    }
    
    
    req.on('close', () => {
        console.log('Connection closed');
    });
})

// make an image from the prompt using the appropriate model
// modelAPI = 'hf' | 'openai' | 'replicate'
app.post('/make-image', async (req: Request, res: Response) => {
    const { modelApi, promptRephrase } = req.body; 
    // Using any here because the image response is different for each model
    let image: any;
    if (typeof promptRephrase === 'string') {

        switch (modelApi) {
            case 'hf':
                image = await hfImage(req.body.promptRephrase);
                console.log('image?', image);
                res.render(path.join('partials', 'generated-image'), {
                    generatedPrompt: image.altText,
                    imgUrl: image.imgUrl,
                    altText: image.altText,
                })
                break;
            case 'openai':
                image = await makeImage(req.body.promptRephrase);
                console.log('image?', image);
                res.render(path.join('partials', 'generated-image'), {
                    generatedPrompt: req.body.promptRephrase,
                    imgUrl: image,
                    altText: req.body.promptRephrase,
                })
                break;
            case 'replicate':
                image = await replicateImage(req.body.promptRephrase);
                console.log('image?', image[0]);
                res.render(path.join('partials', 'generated-image'), {
                    generatedPrompt: req.body.promptRephrase,
                    imgUrl: image[0],
                    altText: req.body.promptRephrase,
                })
                break;
        
            default:
                break;
        }
    }
})

app.listen(port, () => {
    console.log(`App running on server port: http://localhost:${port}`)
})
