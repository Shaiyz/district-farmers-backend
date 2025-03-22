import express from 'express';
import { body } from 'express-validator';
import { authMiddleware } from '../middleware/authMiddleware.ts';
import { createCustomer, getAllCustomers, getCustomerById, syncCustomers } from '../controllers/customerController.ts';

export const customerRoutes = express.Router();

customerRoutes.post(
    '/',
    authMiddleware,
    [
        body('name').notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Valid email is required'),
        body('phone').notEmpty().withMessage('Phone number is required'),
    ],
    createCustomer
);

customerRoutes.get('/', authMiddleware, getAllCustomers);
customerRoutes.get('/:id', authMiddleware ,getCustomerById );
customerRoutes.post('/sync', authMiddleware,syncCustomers);
