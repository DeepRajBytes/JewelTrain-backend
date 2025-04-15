"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config/ENV/config"));
const db_1 = __importDefault(require("./Database/ConnectionSettings/db"));
const index_1 = __importDefault(require("./index"));
const appInstance = new index_1.default();
const init = async () => {
    try {
        await (0, db_1.default)();
        console.log("✅ Connected to database");
        if (config_1.default.mode === "development") {
            const port = config_1.default.port || 5000;
            appInstance.app.listen(port, () => {
                console.log(`🚀 Server is running on port ${port}`);
            });
        }
        else {
            console.log("✅ Serverless deployment mode");
        }
    }
    catch (error) {
        console.error("❌ Failed to connect to database:", error);
    }
};
init();
exports.default = appInstance.app;
// import config from "./config/ENV/config";
// import connectDB from "./Database/ConnectionSettings/db";
// import App from "./index";
// const port = config.port || 5000;
// connectDB().then(() => {
//     const appInstance = new App();
//     appInstance.app.listen(port, () => {
//       console.log(`🚀 Server is running on port ${port}`);
//     });
//   })
//   .catch((error) => {
//     console.error("❌ Failed to connect to database:", error);
//   });
