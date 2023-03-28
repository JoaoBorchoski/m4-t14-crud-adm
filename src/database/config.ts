import { Client } from "pg";
import "dotenv/config";

const client: Client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: +process.env.DB_PORT!,
    host: process.env.DB_HOST,
    database: process.env.DB,
});

export default client;
