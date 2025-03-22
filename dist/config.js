"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    zoho: {
        apiUrl: process.env.ZOHO_API_URL || 'https://api.example.com/sync',
        apiKey: process.env.ZOHO_API_KEY || 'your_zoho_api_key'
    }
};
