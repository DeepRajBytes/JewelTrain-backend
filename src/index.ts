import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import adminAuthRouter from "./api/Admin/Adminauth/Adminauth.router";
import adminRoute from "./api/Admin/AdminRoute/Adminroute.router";
import clientRouter from "./api/Marketing/Clients/Clients.router";
import siteRoute from "./api/Marketing/Site/Site.router";
import userRoute from "./api/Marketing/Users/User.router";
import config from "./config/ENV/config";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.router();
  }

  private config(): void {
    this.app.use(cors());
    this.app.use(bodyParser.json({ limit: "100mb" }));
    this.app.use(
      bodyParser.urlencoded({
        extended: true,
        limit: "100mb",
        parameterLimit: 1000000,
      })
    );
  }

  private router(): void {
    this.app.get("/", (req: Request, res: Response) => {
      res.send("Hello, TypeScript Backend!!");
    });
    this.app.use("/admins/route", adminRoute.router);
    this.app.use("/admins", adminAuthRouter.router);
    this.app.use("/marketing", clientRouter.router);
    this.app.use("/marketing", userRoute.router);
    this.app.use("/marketing", siteRoute.router);
  }
}
export default App;
