import { Pool } from 'pg';

export const pool = new Pool({
    connectionString: process.env.DB_URL,
    user: process.env.DB_USER || "myuser",
    host: process.env.DB_HOST || "localhost",
    database: process.env.DB_NAME || "mydatabase",
    password: process.env.DB_PASS || "12345678",
    port: Number(process.env.DB_PORT) || 5432,
});

export const connectDB = async () => {
    try {
        await pool.connect();
        console.log('Database connected');
    } catch (error) {
        console.error('Database connection failed:', error);
    }
};
