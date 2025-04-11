"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const Adminauth_router_1 = __importDefault(require("./api/Admin/Adminauth/Adminauth.router"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.router();
    }
    config() {
        this.app.use((0, cors_1.default)());
        this.app.use(body_parser_1.default.json({ limit: '100mb' }));
        this.app.use(body_parser_1.default.urlencoded({ extended: true, limit: '100mb', parameterLimit: 1000000 }));
    }
    router() {
        this.app.get("/", (req, res) => {
            res.send("Hello, TypeScript Backend!!");
        });
        this.app.use("/admin", Adminauth_router_1.default.router);
    }
}
exports.default = App;
