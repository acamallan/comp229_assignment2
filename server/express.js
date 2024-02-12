import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import productRoutes from './routes/product.route.js'
const app = express()

app.get('/', (req, res) => {
    res.json({ message: "Welcome to DressStore application." });
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', productRoutes)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())

export default app
