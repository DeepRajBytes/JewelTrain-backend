import { config } from "../../../config/common/config.json";
import UserRepository from "../../../repository/Marketing/User/user.marketing.repository";
export class Usercontroller {
  public async Saveuser(req: any, res: any) {
    try {
      const userRepoclass = new UserRepository();
      const userCreationRes: any = await userRepoclass.SaveUser(req);
      if (userCreationRes.success === 1) {
        res.status(config.statusCode.successful).json({
          success: userCreationRes.success,
          data: userCreationRes.data,
        });
      } else if (userCreationRes.success === 2) {
        res
          .status(config.statusCode.conflict)
          .json({ success: 0, MESSAGE: userCreationRes.data });
      } else {
        res
          .status(config.statusCode.internalServer)
          .json({ success: 0, MESSAGE: "Something went wrong from our side" });
      }
    } catch (error: any) {
      res
        .status(config.statusCode.internalServer)
        .json({ error: error.message });
    }
  }

  public async GetInfoForUser(req: any, res: any) {
    try {
      const userRepoclass = new UserRepository();
      const FinalResponse: any = await userRepoclass.GetInfoForUser();
      if (FinalResponse) {
        res
          .status(config.statusCode.successful)
          .json({ success: 1, data: FinalResponse });
      } else {
        res
          .status(config.statusCode.internalServer)
          .json({ success: 0, MESSAGE: "Something went wrong from our side" });
      }
    } catch (error: any) {
      res
        .status(config.statusCode.internalServer)
        .json({ error: error.message });
    }
  }
}
