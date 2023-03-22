import express from "express";
import { pool } from './db.js'
import registroRoute from './routes/registro.routes.js'
import './config.js'


const app = express();


app.use(express.json());

app.use('/api', registroRoute)

app.use((req, res, next) => {
    res.status(404).json({
        message: "Endpoint Not Found"
    })
})

app.listen(3020)

console.log(`Server is running on port: ${process.env.PORT}`)
