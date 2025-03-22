import { Request, Response } from 'express';
import { pool } from '../db.ts';
import axios from 'axios';
import { config } from '../config.ts';

export const createCustomer = async (req: Request, res: Response) => {
    try {
        const { name, email, phone } = req.body;
        const result = await pool.query('INSERT INTO customers (name, email, phone) VALUES ($1, $2, $3) RETURNING *', [name, email, phone]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getAllCustomers = async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM customers');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const getCustomerById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

    

        const result = await pool.query('SELECT * FROM customers WHERE id = $1', [id]);

        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Customer not found' });
            return; 
           }

        res.json(result.rows[0]); 
    } catch (error) {
        console.error('Error fetching customer:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
export const syncCustomers = async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM customers');
        const customers = result.rows;

       if (!customers || customers.length === 0) {
            res.status(404).json({ error: 'No customers found' });
            return; 
        }

        const response = await syncWithZohoAPI(customers);

        if (response.status === 200) {
            res.json({ message: 'Data synced successfully', data: response.data });
        } else {
            res.status(response.status).json({ error: 'Sync failed', details: response.data });
        }
    } catch (error) {
        res.status(500).json({ error, details: 'Sync failed' });
    }
};

const syncWithZohoAPI = async (customers: any[]) => {
    const zohoApiUrl = config.zoho.apiUrl;
    const zohoApiKey = config.zoho.apiKey;

    try {
        const response = await axios.post(zohoApiUrl, { customers }, {
            headers: {
                'Authorization': `Bearer ${zohoApiKey}`,
                'Content-Type': 'application/json'
            }
        });

        return response;
    } catch (error) {
        throw error;
    }
};