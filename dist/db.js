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
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = exports.pool = void 0;
const pg_1 = require("pg");
exports.pool = new pg_1.Pool({
    connectionString: process.env.DB_URL,
    user: process.env.DB_USER || "myuser",
    host: process.env.DB_HOST || "localhost",
    database: process.env.DB_NAME || "mydatabase",
    password: process.env.DB_PASS || "12345678",
    port: Number(process.env.DB_PORT) || 5432,
});
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.pool.connect();
        console.log('Database connected');
    }
    catch (error) {
        console.error('Database connection failed:', error);
    }
});
exports.connectDB = connectDB;
