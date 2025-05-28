import { Router } from "express";
import { Sitecontroller } from "./Site.controller";

class SiteRoute {
    router: Router;
    private siteController = new Sitecontroller()
    constructor () {
        this.router = Router()
        this.init()
    }
    init() {
        this.router.get('/sitedata', this.siteController.getSitedata)
    }
}

const siteRoute = new SiteRoute()

export default siteRoute;