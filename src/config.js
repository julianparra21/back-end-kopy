import { config } from 'dotenv'
config()

export const PORT = process.env.PORT
export const DB_USER = process.env.DB_USER
export const DB_PASSWORD = process.env.DB_PASSWORD
export const DB_HOST = process.env.DB_HOST
export const DB_DATABASE = process.env.DB_DATABASE
export const DB_PORT = process.env.DB_PORT


export const USER_EMAIL = process.env.USER_EMAIL
export const PASS_EMAIL = process.env.PASS_EMAIL
export const HOST_EMAIL = process.env.HOST_EMAIL
export const PORT_EMAIL = process.env.PORT_EMAIL
