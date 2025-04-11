import * as bcrypt from "bcrypt";
import AdmincredentialModel from "../../Database/Model/Auth/AdminCreditional";
import { IAdminauthRepository } from "../contracts/Adminauth/i.adminauth.repository";

class AdminauthRepository implements IAdminauthRepository {
  async signup(requesData: any): Promise<number> {
    try {
      const email = requesData.email;
      const nonHashPass = requesData.password;
      const mobile = requesData.mobile;

      // Find exisiting Email
      const isAdminEmailPresent = await AdmincredentialModel.findOne({
        email: email,
      });
      if (isAdminEmailPresent) {
        return 1;
      }
      // Find exisiting Mobile
      const isAdminMobilePresent = await AdmincredentialModel.findOne({
        mobile: mobile,
      });
      if (isAdminMobilePresent) {
        return 2;
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(nonHashPass, salt);

      const AdminCred = await AdmincredentialModel.create({
        password: hashedPassword,
        email: email,
        mobile: mobile,
      });
      if (AdminCred) {
        return 3;
      }
      return 4;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export default AdminauthRepository;
