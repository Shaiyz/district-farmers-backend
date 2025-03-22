import { Request, Response } from 'express';
import { pool } from '../db.ts';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const JWT_SECRET=process.env.SECRET as string || "SECRET"

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { username, password,email} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query('INSERT INTO users (username, password,email) VALUES ($1, $2, $3) RETURNING *', [username, hashedPassword,email]);
        res.status(200).json(result.rows[0]);
    } catch (error) {
       
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ error: 'Email and password are required' });
            return;
        }

        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ error: 'Invalid credentials' });
            return;
        }

        const token = jwt.sign({ id: user.id, email: user.email, username: user.username }, JWT_SECRET, { expiresIn: '5m' });
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error in loginUser:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};