"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const authMiddleware_1 = require("../middleware/authMiddleware");
const customerController_1 = require("../controllers/customerController");
exports.customerRoutes = express_1.default.Router();
exports.customerRoutes.post('/', authMiddleware_1.authMiddleware, [
    (0, express_validator_1.body)('name').notEmpty().withMessage('Name is required'),
    (0, express_validator_1.body)('email').isEmail().withMessage('Valid email is required'),
    (0, express_validator_1.body)('phone').notEmpty().withMessage('Phone number is required'),
], customerController_1.createCustomer);
exports.customerRoutes.get('/', authMiddleware_1.authMiddleware, customerController_1.getAllCustomers);
exports.customerRoutes.get('/:id', authMiddleware_1.authMiddleware, customerController_1.getCustomerById);
exports.customerRoutes.post('/sync', authMiddleware_1.authMiddleware, customerController_1.syncCustomers);
