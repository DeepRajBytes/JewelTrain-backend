"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Clients_controller_1 = require("./Clients.controller");
class ClientRoute {
    constructor() {
        this.clientController = new Clients_controller_1.ClientController;
        this.router = (0, express_1.Router)();
        this.init();
    }
    init() {
        this.router.post("/clientcreate", this.clientController.storeClient);
    }
    ;
}
const clientRouter = new ClientRoute();
exports.default = clientRouter;
