"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = require("body-parser");
const customerRoutes_1 = require("./routes/customerRoutes");
const userRoutes_1 = require("./routes/userRoutes");
const redis_1 = require("./redis");
const db_1 = require("./db");
const errorMiddleware_1 = require("./errorMiddleware");
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
dotenv_1.default.config();
app.use((0, cors_1.default)());
app.use((0, body_parser_1.json)());
app.use(errorMiddleware_1.errorHandler);
app.use('/customers', customerRoutes_1.customerRoutes);
app.use('/users', userRoutes_1.userRoutes);
(0, db_1.connectDB)();
redis_1.redisClient.connect().then(() => console.log('Redis connected'));
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
