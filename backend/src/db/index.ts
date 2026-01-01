import {drizzle} from 'drizzle-orm/postgres-js';
import { Pool } from 'pg';
import * as schema from './schema';
import { ENV } from '../config/env';



if(!ENV.DB_URL){
    throw new Error("DB_URL is not Set")
}


const pool = new Pool({ connectionString: ENV.DB_URL});

pool.on("connect", () => {
    console.log("Database connected ✅")
})

pool.on("error", (error) => {
    console.error("Database connection error ❌", error)
});



export const db = drizzle({client:pool, schema});


