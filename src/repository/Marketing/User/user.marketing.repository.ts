import DriveUploadMEthods from "../../../config/Upload/drive.upload";
import { IUserRepository } from "../../contracts/Marketing/User/i.user.marketing.repository";

class UserRepository implements IUserRepository {
  public async SaveUser(req: any): Promise<any> {
    try {
      const uploader = new DriveUploadMEthods();
      await uploader
        .authorize()
        .then((authClient) => uploader.uploadFIle(authClient))
        .then((file: any) => {
          console.log("File uploaded successfully with ID:", file.data);
        })
        .catch((error) => {
          console.error("Error occurred:", error);
        });
        return req;
    } catch (error: any) {
      throw new Error(error)
    }
  }
}

export default UserRepository;
