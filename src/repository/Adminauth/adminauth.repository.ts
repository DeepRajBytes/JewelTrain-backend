import * as bcrypt from "bcrypt";
import AdmincredentialModel from "../../Database/Model/Auth/AdminCreditional";
import { IAdminauthRepository } from "../contracts/Adminauth/i.adminauth.repository";
import JWT from 'jsonwebtoken'
import config from "../../config/ENV/config";

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

  async signin(requesData: any): Promise<any> {
    try {
      const email = requesData.email;
      const nonHashPass = requesData.password;
      const mobile = requesData.mobile;

      // Find exisiting Email
      let isAdminEmailPresent;
      if (email) {
        isAdminEmailPresent = await AdmincredentialModel.findOne(
          {
            email: email,
          },
          { _id: 0, email: 1, password: 1, mobile: 1 }
        );
        if (!isAdminEmailPresent) {
          return 1;
        }
      }
      
      // Find exisiting Mobile
      let isAdminMobilePresent;
      if (mobile) {
        isAdminMobilePresent = await AdmincredentialModel.findOne(
          {
            mobile: mobile,
          },
          { _id: 0, email: 1, password: 1, mobile: 1 }
        );
        if (!isAdminMobilePresent) {
          return 2;
        }
      }
      if(isAdminMobilePresent){
        const hashedPassword = await bcrypt.compare(
          nonHashPass,
          isAdminMobilePresent.password
        );
        if(!hashedPassword) {
          return 3
        }
      }
      if(isAdminEmailPresent) {
        const hashedPassword = await bcrypt.compare(
          nonHashPass,
          isAdminEmailPresent.password
        );
        if (!hashedPassword) {
          return 3;
        }
      }

      const token = JWT.sign({ email: email, mobile: mobile }, config.JWT_SECREAT_KEY);
      

      const AdminCred = {
        token: token,
        data: isAdminEmailPresent ? isAdminEmailPresent : isAdminMobilePresent,
      };
      if (AdminCred) {
        return AdminCred;
      }
      return 4;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export default AdminauthRepository;
