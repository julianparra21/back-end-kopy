import {config} from 'dotenv'
import express from "express";

import morgan from 'morgan'
import cors from 'cors'
import userRoutes from './routes/user.routes.js'
import adminRoutes from './routes/admin.routes.js'
import domiciliarioRoutes from './routes/domiciliario.routes.js'
import productRoutes from './routes/product.routes.js'
import { PORT } from '../config.js';



const app = express();

app.use(express.json());
app.use(cors({
    origin: "*"
}));
app.use(morgan('dev'))

config()

app.use('/user', userRoutes)
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