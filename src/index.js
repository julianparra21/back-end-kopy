import {config} from 'dotenv'
import express from "express";

import cors from 'cors'
import userRoutes from './routes/user.routes.js'
import adminRoutes from './routes/admin.routes.js'
import domiciliarioRoutes from './routes/domiciliario.routes.js'
import productRoutes from './routes/product.routes.js'


const app = express();


app.use(express.json());
app.use(cors());

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

app.listen(3020)
console.log(`🦾  Server is running on port ${process.env.PORT} 😬`);
