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
        title: 'OpenAI',
    })
})


app.post('/make-image', async (req: Request, res: Response) => {
    const prompt: string | null = await makePrompt(req.body.prompt);
    if (typeof prompt === 'string') {
        const image = await makeImage(prompt)
        
        res.render(path.join('partials', 'generated-image'), {
            generatedPrompt: prompt,
            imgUrl: image,
            altText: req.body.prompt,
        })
    }
})

app.listen(port, () => {
    console.log(`App running on server port: http://localhost:${port}`)
})
