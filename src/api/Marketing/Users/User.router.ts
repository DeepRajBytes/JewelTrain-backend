import { Router } from "express";
import { Usercontroller } from "./User.controller";
import { uploadMiddleware } from "../../../config/Middlerware/UploadResumeMidlle";
class Userroute {
  router: Router;
  private userController = new Usercontroller;
  constructor() {
    this.router = Router();
    this.init();
  }
  init() {
    this.router.post("/userCreate",uploadMiddleware, this.userController.Saveuser);
    this.router.get("/userIntitalse", this.userController.GetInfoForUser);
  }
}

const userRoute = new Userroute();

export default userRoute;
