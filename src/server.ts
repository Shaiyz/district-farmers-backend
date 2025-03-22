import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import { customerRoutes } from './routes/customerRoutes.ts';
import { userRoutes } from './routes/userRoutes.ts';
// import { redisClient } from './redis.ts';
import morgan from "morgan"; // Logging middleware
import { connectDB } from './db.ts';
import { errorHandler } from './errorMiddleware.ts';
import dotenv from 'dotenv';
import { createUserTable } from './models/User';
import { createCustomerTable } from './models/Customer.ts';

const app = express();
dotenv.config();

app.use(cors({origin:"*"})); 
app.use(json());
app.use(morgan("dev")); 
app.use(errorHandler)
app.use('/customers', customerRoutes);
app.use('/users', userRoutes);

connectDB();
createUserTable(); 
createCustomerTable(); 

const PORT = process.env.PORT || 5001

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
