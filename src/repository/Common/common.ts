import nodemailer from "nodemailer";
import smptModel from "../../Database/Model/common/SMPT/smpt";
import SMTPTransport from "nodemailer/lib/smtp-transport";

class CommonService {
  public async sentMail(userData: any) {
    try {
      const SMPT_Details = await smptModel.find({ service: "gmail" });
      const smpt_details = SMPT_Details[0];
      const transporter = nodemailer.createTransport({
        service: smpt_details.service,
        port: smpt_details.port,
        secure: false,
        auth: {
          user: smpt_details.user,
          pass: smpt_details.password,
        },
      } as SMTPTransport.Options);
      
      const receiver = {
        from: `JewelTrain<${smpt_details.user}>`,
        to: userData.email,
        subject: "Hello From JewelTrain",
        text: `Hello ${userData.name}, Thanks for connecting us, one of our executive connect with you as soon as possible`,
      };
      const info = await transporter.sendMail(
        receiver,
        (error: any, emailResponse) => {
          if (error) {
            console.log("error", error);
            throw new Error(error);
          }
        }
      );
      return true;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  public async sentAdminMail(userData: any) {
    try {
      const SMPT_Details = await smptModel.find({ service: "gmail" });
      const smpt_details = SMPT_Details[0];

      const transporter = nodemailer.createTransport({
        service: smpt_details.service,
        port: smpt_details.port,
        secure: false,
        auth: {
          user: smpt_details.user,
          pass: smpt_details.password,
        },
      } as SMTPTransport.Options);

      const receiver = {
        from: `JewelTrain Admin new Client<${smpt_details.user}>`,
        to: smpt_details.admin_email,
        subject: "JewelTrain New Client Request",
        text: `Hello Admin, MR. ${userData.name} fill the new entry the follwing details of this guy :- number :- ${userData.number}, email :- ${userData.email}, brandName :- ${userData.brandName}. query :- ${userData.message}`,
      };
      const info = await transporter.sendMail(
        receiver,
        (error: any, emailResponse) => {
          if (error) {
            throw new Error(error);
          }
          console.log("sucess");
        }
      );
      return true;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export default CommonService;
