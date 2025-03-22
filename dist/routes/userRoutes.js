"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = require("../middleware/authMiddleware");
exports.userRoutes = express_1.default.Router();
exports.userRoutes.post("/register", authMiddleware_1.authMiddleware, [(0, express_validator_1.body)("username").notEmpty(), (0, express_validator_1.body)("password").isLength({ min: 6 })], userController_1.registerUser);
exports.userRoutes.post("/login", authMiddleware_1.authMiddleware, [(0, express_validator_1.body)("username").notEmpty()], userController_1.loginUser);
