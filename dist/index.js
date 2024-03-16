"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const routes_1 = __importDefault(require("./routes"));
require('dotenv').config();
const app = (0, express_1.default)();
let port = process.env.PORT || 4000;
const db_url = process.env.DB_URL;
app.use(express_1.default.json());
app.use(routes_1.default);
async function start() {
    try {
        await mongoose_1.default.connect(db_url);
        console.log('Connected to database');
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
    catch (e) {
        console.log('failed to connect to database ', e);
    }
}
start();
