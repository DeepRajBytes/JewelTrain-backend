"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config"));
const connectDB = async () => {
    try {
        if (!config_1.default.mongoDBurl) {
            throw new Error("MONGODB_URI not defined in ENV Contatc Admin");
        }
        await mongoose_1.default.connect(config_1.default.mongoDBurl);
        console.log("MongoDB Connected...");
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.default = connectDB;
