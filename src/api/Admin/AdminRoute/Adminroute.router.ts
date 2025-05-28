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
    this.router.post(
      "/users",
      Adminauthentication,
      this.adminrouteController.UsersList
    );
    this.router.delete(
      "/users/delete",
      Adminauthentication,
      this.adminrouteController.Userdelete
    );
    this.router.post(
      "/users/update",
      Adminauthentication,
      this.adminrouteController.updateUser
    );
    this.router.get(
      "/users/userdetail/:id",
      Adminauthentication,
      this.adminrouteController.UserDetails
    );
    this.router.put(
      "/users/blockAction",
      Adminauthentication,
      this.adminrouteController.ActionUser
    );

    // Client routes
    this.router.post(
      "/clients",
      Adminauthentication,
      this.adminrouteController.ClientList
    );
    this.router.get(
      "/clients/clientdetail/:id",
      Adminauthentication,
      this.adminrouteController.ClientDetails
    );
    this.router.delete(
      "/clients/delete",
      Adminauthentication,
      this.adminrouteController.Clientdelete
    );
    this.router.post(
      "/clients/update",
      Adminauthentication,
      this.adminrouteController.updateClient
    );
    this.router.put(
      "/clients/blockAction",
      Adminauthentication,
      this.adminrouteController.ActionClient
    );
  }
}
const adminRoute = new Adminroute();
export default adminRoute;
