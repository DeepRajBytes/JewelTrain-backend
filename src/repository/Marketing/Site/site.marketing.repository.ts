import SitedataModel from "../../../Database/Model/Marketing/Sitedata.model";
import { ISiteRepository } from "../../contracts/Marketing/Site/i.site.marketing.repository";

class SiteRepository implements ISiteRepository {
  async GetSitedata(): Promise<any> {
    try {
      const siteData = await SitedataModel.find();
      console.log("siteData", siteData);
      if (siteData) {
        return {success: 1,data: siteData};
      } else {
        return {success: 0, data:"We Are Down Now , Please Hard refresh or come back later"}
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async EditSitedata(req: any): Promise<any> {
    try {
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export default SiteRepository;
