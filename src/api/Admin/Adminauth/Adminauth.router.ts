import { Router } from "express";
import { AdminauthController } from "./Adminauth.controller";

class Adminauth {
  router: Router;

  private adminauthController = new AdminauthController();

  constructor() {
    this.router = Router();
    this.init();
  }

  init() {
    this.router.post("/adminsignup", this.adminauthController.signup);
  }
}

const adminAuthRouter = new Adminauth();

export default adminAuthRouter;
