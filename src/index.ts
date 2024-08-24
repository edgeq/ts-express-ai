import 'dotenv/config'
import path from 'node:path';
import express, { Express, Request, Response } from 'express'
import { makePrompt, makeImage } from './models/openai'

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


app.post('/make-image', async (req: Request, res: Response) => {
    const { model, prompt} = req.body;
    
    if (typeof prompt === 'string') {
        const chatStream = await makePrompt(req.body.prompt);
        
        console.log('rephrasePrompt');
        
        for await (const chunk of chatStream) {
            console.log(chunk.choices[0]?.delta?.content);
        }
        // if req.body.model is one of three options, use that options api  
        switch (model) {
            case 'openai':
                console.log('openai model')
                break;
            case 'huggingface':
                console.log('huggingface model')
                break;
            case 'replicate':
                console.log('replicate model')
                break;
        
            default:
                break;
        }
        // const image = await makeImage(prompt)
        
        // res.render(path.join('partials', 'generated-image'), {
        //     generatedPrompt: prompt,
        //     imgUrl: image,
        //     altText: req.body.prompt,
        // })
    }
})

app.post('/make-image-test', async (req: Request, res: Response) => {
    console.log(req.body)
    // setTimeout(() => {
    //     res.render(path.join('partials', 'generated-image'), {
    //         generatedPrompt: 'prompt was made',
    //         imgUrl: '/assets/images/out-1.webp',
    //         altText: 'alt text goes here',
    //     })
    // }, 5000)
})

app.listen(port, () => {
    console.log(`App running on server port: http://localhost:${port}`)
})
