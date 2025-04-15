"use strict";
// import config from "./config/ENV/config";
// import connectDB from "./Database/ConnectionSettings/db";
// import App from "./index";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("./Database/ConnectionSettings/db"));
const index_1 = __importDefault(require("./index"));
const appInstance = new index_1.default();
const init = async () => {
    try {
        await (0, db_1.default)();
        console.log("✅ Connected to database");
    }
    catch (error) {
        console.error("❌ Failed to connect to database:", error);
    }
};
init();
// 🚨 NO app.listen()
// ✅ Instead, export the app instance for Vercel
exports.default = appInstance.app;
