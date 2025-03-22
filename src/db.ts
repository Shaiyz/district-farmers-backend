import { Pool } from 'pg';
import 'dotenv/config'; 
export const pool = new Pool({
        connectionString: 'postgresql://postgres.feprlikcyzpdoszcuppz:Worldof123@@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres' ,
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
