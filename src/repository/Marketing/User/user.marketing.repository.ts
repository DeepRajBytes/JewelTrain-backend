import moment from "moment";
import DriveUploadMEthods from "../../../config/Upload/drive.upload";
import { IUserRepository } from "../../contracts/Marketing/User/i.user.marketing.repository";
import Experience from "../../../Database/Model/common/Experience/Experience";
import State from "../../../Database/Model/common/Address/State";

class UserRepository implements IUserRepository {
  public async SaveUser(req: any): Promise<any> {
    try {
      const uploader = new DriveUploadMEthods();
      const file = req.file;
      const currentDate = moment().format("YYYY-MM-DD");
      const { firstname, lastname } = req.body;
      const newFileName = `${currentDate}_${firstname.replace(
        / /g,
        "_"
      )}_${lastname.replace(/ /g, "_")}${file.originalname.slice(
        file.originalname.lastIndexOf(".")
      )}`;

      // Upload File
      let UploadedResumeDetails: any
      await uploader
        .authorize()
        .then((authClient) =>
          uploader.uploadFIle(authClient, file, newFileName)
        )
        .then((file: any) => {
          UploadedResumeDetails = file.data
        })
        .catch((error) => {
          throw new Error(error)
        });
        

      return req.body;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  public async GetInfoForUser(): Promise<any> {
    try {
      const ExpirenceList = await Experience.find({})
      const StateList = await State.find({})
      const FinalResponse = {
        ExpirenceList,
        StateList,
      };
      return FinalResponse;
    } catch (error: any) {
      throw new Error(error)
    }
  }
}

export default UserRepository;
