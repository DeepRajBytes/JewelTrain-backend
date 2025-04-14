import express, { Request, Response } from "express";
import cors from 'cors';
import bodyParser from "body-parser";
import adminAuthRouter from "./api/Admin/Adminauth/Adminauth.router";
import clientRouter from "./api/Marketing/Clients/Clients.router"
import config from "./config/ENV/config";


class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.router();
  }

  private config(): void {
    this.app.use(cors())
    this.app.use(bodyParser.json({ limit: '100mb'}))
    this.app.use(bodyParser.urlencoded({extended: true , limit: '100mb', parameterLimit: 1000000}))
  }

  private router(): void {
    this.app.get("/", (req: Request, res: Response) => {
      res.send("Hello, TypeScript Backend!!");
    });
    this.app.use("/admin", adminAuthRouter.router);
    this.app.use("/marketing", clientRouter.router);
  }
}
export default App;
