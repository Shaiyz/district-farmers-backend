import { Pool } from 'pg';
import 'dotenv/config'; 
export const pool = new Pool({
    connectionString: process.env.DB_URL ,
        ssl: {
        rejectUnauthorized: false, 
      },
});

export const connectDB = async () => {
    try {
        await pool.connect();
        console.log('Database connected');
    } catch (error) {
        console.error('Database connection failed:', error);
    }
};
