import 'dotenv/config'
import path from 'node:path';
import express, { Express, Request, Response } from 'express'

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
        title: 'Express & Typescript',
    })
})
app.get('/get-html', (req: Request, res: Response) => {
    res.render(path.join('partials', 'list'), {
        list: ['should', 'swap', 'with', 'button'],
    })
})

app.listen(port, () => {
    console.log(`App running on server port: http://localhost:${port}`)
})
