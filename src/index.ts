import 'dotenv/config'
import express, { Express, Request, Response } from 'express'

const app: Express = express();
const port = process.env.PORT

app.get('/', (req: Request, res: Response) => {
    res.send('Hi, from Express and a bunch of npm packages!')
})

app.listen(port, () => {
    console.log(`App running on server port: http://localhost:${port}`)
})
