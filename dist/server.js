"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config/ENV/config"));
const db_1 = __importDefault(require("./Database/ConnectionSettings/db"));
const index_1 = __importDefault(require("./index"));
const port = config_1.default.port || 5000;
(0, db_1.default)().then(() => {
    const appInstance = new index_1.default();
    appInstance.app.listen(port, () => {
        console.log(`🚀 Server is running on port ${port}`);
    });
})
    .catch((error) => {
    console.error("❌ Failed to connect to database:", error);
});
