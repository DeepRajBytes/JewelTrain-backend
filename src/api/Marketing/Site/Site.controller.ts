import { config } from "../../../config/common/config.json";
import { Request, Response } from "express";
import SiteRepository from "../../../repository/Marketing/Site/site.marketing.repository";

export class Sitecontroller {
  public async getSitedata(req: Request, res: Response): Promise<any> {
    try {
      const siteRepo = new SiteRepository();
      const siteData = await siteRepo.GetSitedata();
      if (siteData.success === 1) {
        res
          .status(config.statusCode.successful)
          .json({ message: "SITE_DATA_GET", success: true, data: siteData.data });
      } else {
        res
          .status(config.statusCode.internalServer)
          .json({ error: "FAIL_DATA_GET", success: false, data: siteData.data });
      }
    } catch (error: any) {
      res
        .status(config.statusCode.internalServer)
        .json({ error: error.message });
    }
  }
}
