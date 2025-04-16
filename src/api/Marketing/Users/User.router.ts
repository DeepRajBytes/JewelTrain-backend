import { Router } from "express";
import { Usercontroller } from "./User.controller";
class Userroute {
  router: Router;
  private userController = new Usercontroller;
  constructor() {
    this.router = Router();
    this.init();
  }
  init() {
    this.router.post("/userCreate", this.userController.Saveuser);
  }
}

const userRoute = new Userroute();

export default userRoute;
