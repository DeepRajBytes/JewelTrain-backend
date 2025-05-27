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
    this.router.post("/adminsignin", this.adminauthController.signin);
    this.router.get("/adminIntitalse", this.adminauthController.GetInfoForUserAdmin);
  }
}

const adminAuthRouter = new Adminauth();

export default adminAuthRouter;
