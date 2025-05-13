import { Router } from "express";
import { AdminrouteController } from "./Adminroute.controller";
import { Adminauthentication } from "../../../config/Middlerware/Adminauth";

class Adminroute {
  router: Router;
  private adminrouteController = new AdminrouteController();
  constructor() {
    this.router = Router();
    this.init();
  }

  public init() {
    this.router.post("/users", this.adminrouteController.UsersList);
    this.router.delete("/users/delete", this.adminrouteController.Userdelete);
    this.router.post(
      "/users/update",
      Adminauthentication,
      this.adminrouteController.updateUser
    );
  }
}
const adminRoute = new Adminroute;
export default adminRoute;