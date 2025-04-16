import { any } from "joi";
import { config } from "../../../config/common/config.json";
import UserRepository from "../../../repository/Marketing/User/user.marketing.repository";

export class Usercontroller {
  public async Saveuser(req: any, res: any) {
    try {
      const userRepoclass = new UserRepository();
      const userCreationRes: any = await userRepoclass.SaveUser(req.body);
      if (userCreationRes) {
        res
          .status(config.statusCode.successful)
          .json({ success: 1, data: userCreationRes });
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
