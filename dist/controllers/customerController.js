"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncCustomers = exports.getCustomerById = exports.getAllCustomers = exports.createCustomer = void 0;
const db_1 = require("../db");
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../config");
const createCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, phone } = req.body;
        const result = yield db_1.pool.query('INSERT INTO customers (name, email, phone) VALUES ($1, $2, $3) RETURNING *', [name, email, phone]);
        res.status(201).json(result.rows[0]);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.createCustomer = createCustomer;
const getAllCustomers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_1.pool.query('SELECT * FROM customers');
        res.json(result.rows);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getAllCustomers = getAllCustomers;
const getCustomerById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const customerId = parseInt(id, 10);
        if (isNaN(customerId)) {
            res.status(400).json({ error: 'Invalid customer ID' });
            return;
        }
        const result = yield db_1.pool.query('SELECT * FROM customers WHERE id = $1', [customerId]);
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Customer not found' });
            return;
        }
        res.json(result.rows[0]);
    }
    catch (error) {
        console.error('Error fetching customer:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getCustomerById = getCustomerById;
const syncCustomers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_1.pool.query('SELECT * FROM customers');
        const customers = result.rows;
        if (!customers || customers.length === 0) {
            res.status(404).json({ error: 'No customers found' });
            return;
        }
        const response = yield syncWithZohoAPI(customers);
        if (response.status === 200) {
            res.json({ message: 'Data synced successfully', data: response.data });
        }
        else {
            res.status(response.status).json({ error: 'Sync failed', details: response.data });
        }
    }
    catch (error) {
        res.status(500).json({ error, details: 'Sync failed' });
    }
});
exports.syncCustomers = syncCustomers;
const syncWithZohoAPI = (customers) => __awaiter(void 0, void 0, void 0, function* () {
    const zohoApiUrl = config_1.config.zoho.apiUrl;
    const zohoApiKey = config_1.config.zoho.apiKey;
    try {
        const response = yield axios_1.default.post(zohoApiUrl, { customers }, {
            headers: {
                'Authorization': `Bearer ${zohoApiKey}`,
                'Content-Type': 'application/json'
            }
        });
        return response;
    }
    catch (error) {
        throw error;
    }
});
