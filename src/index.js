import {config} from 'dotenv'
import express from "express";
import morgan from 'morgan'
import cors from 'cors'
import userRoutes from './routes/user.routes.js'
import adminRoutes from './routes/admin.routes.js'
import domiciliarioRoutes from './routes/domiciliario.routes.js'
import productRoutes from './routes/product.routes.js'
import buyRoutes from './routes/buy.routes.js'
import Stripe from 'stripe'

import { PORT } from '../config.js';
const stripe=new Stripe ("sk_test_51MyDPuD7xwBecERvs5KLjTQJdhDvdJeCoDTTZRrLRvIl1ABbeILF9j2aGc9HOUO1qiTN6eR476D8Qgjpb0CY3dbU002EzWIZGw")
const app = express();

app.use(express.json());
app.use(cors({
    origin: "*"
}));
app.use(morgan('dev'))

config()

app.use('/user', userRoutes)
app.use('/buy', buyRoutes)
app.use('/admin', adminRoutes)
app.use('/domiciliary', domiciliarioRoutes)
app.use('/product', productRoutes)

app.use((req, res, next) => {
    res.status(404).json({
        message: "Endpoint Not Found"
    })
})

app.listen(PORT)
console.log(`🦾  Server is running on port ${PORT} 😬`);

export {app}