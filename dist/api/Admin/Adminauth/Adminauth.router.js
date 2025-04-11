"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Adminauth_controller_1 = require("./Adminauth.controller");
class Adminauth {
    constructor() {
        this.adminauthController = new Adminauth_controller_1.AdminauthController();
        this.router = (0, express_1.Router)();
        this.init();
    }
    init() {
        this.router.post("/adminsignup", this.adminauthController.signup);
    }
}
const adminAuthRouter = new Adminauth();
exports.default = adminAuthRouter;
