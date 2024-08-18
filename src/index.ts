import 'dotenv/config'
import path from 'node:path';
import express, { Express, Request, Response } from 'express'

const app: Express = express();
const port = process.env.PORT
/**
 * STATIC RESOURCES
 */
app.use(express.static(path.join(__dirname, 'public')))
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

app.listen(port, () => {
    console.log(`App running on server port: http://localhost:${port}`)
})
