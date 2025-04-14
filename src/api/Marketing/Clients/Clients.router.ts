import { Router } from "express";
import { ClientController } from "./Clients.controller";

class ClientRoute {
  router: Router;
  private clientController = new ClientController
  constructor() {
    this.router = Router();
    this.init();
  }
  init() {
    this.router.post("/clientcreate", this.clientController.storeClient);
  };
}

const clientRouter = new ClientRoute();

export default clientRouter;