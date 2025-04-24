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
        html: `
    <div style="max-width: 600px; margin: auto; background-color: #ffffff; border: 1px solid #ddd; border-radius: 10px; overflow: hidden; font-family: 'Arial', sans-serif; box-shadow: 0 4px 8px rgba(0,0,0,0.05);">
  <!-- Header -->
  <div style="background-color: #4f46e5; padding: 20px 30px; color: white; text-align: center;">
    <h1 style="margin: 0; font-size: 28px;">JewelTrain</h1>
    <p style="margin: 5px 0 0; font-size: 16px;">Empowering Your Jewellery Business</p>
  </div>

  <!-- Body -->
  <div style="padding: 30px;">
    <h2 style="color: #333;">Hello ${userData.name},</h2>
    <p style="font-size: 15px; color: #555;">
      Thank you for getting in touch with <strong>JewelTrain</strong>. We specialize in helping jewellery businesses grow with expert consulting, sales training, HR solutions, and ERP learning support.
    </p>
    <p style="font-size: 15px; color: #555;">
      One of our experienced consultants will contact you shortly to understand your needs and help you get started on your journey to success.
    </p>

    <div style="margin-top: 25px;">
      <a href="https://jeweltrain-stag.vercel.app/" style="display: inline-block; background-color: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
        Visit Our Website
      </a>
    </div>
  </div>

  <!-- Footer -->
  <div style="background-color: #f9fafb; padding: 20px 30px; text-align: center; font-size: 13px; color: #888;">
    © ${new Date().getFullYear()} JewelTrain. All rights reserved.
    <br />
    <a href="mailto:career@jewel.com" style="color: #4f46e5;">info@jewel.in</a>
  </div>
</div>`,
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
        html: `<div style="max-width: 600px; margin: auto; background-color: #ffffff; border: 1px solid #ddd; border-radius: 10px; overflow: hidden; font-family: 'Arial', sans-serif; box-shadow: 0 4px 8px rgba(0,0,0,0.05);">
  <!-- Header -->
  <div style="background-color: #1e40af; padding: 20px 30px; color: white; text-align: center;">
    <h1 style="margin: 0; font-size: 28px;">JewelTrain</h1>
    <p style="margin: 5px 0 0; font-size: 16px;">New Entry Submitted</p>
  </div>

  <!-- Body -->
  <div style="padding: 30px;">
    <h2 style="color: #333;">Hello Admin,</h2>
    <p style="font-size: 15px; color: #555;">
      A new contact form has been submitted. Below are the details:
    </p>

    <table style="width: 100%; margin-top: 20px; font-size: 15px; color: #333; border-collapse: collapse;">
      <tr>
        <td style="padding: 8px; font-weight: bold; width: 150px;">Name:</td>
        <td style="padding: 8px;">${userData.name}</td>
      </tr>
      <tr style="background-color: #f9fafb;">
        <td style="padding: 8px; font-weight: bold;">Email:</td>
        <td style="padding: 8px;">${userData.email}</td>
      </tr>
      <tr>
        <td style="padding: 8px; font-weight: bold;">Phone Number:</td>
        <td style="padding: 8px;">${userData.number}</td>
      </tr>
      <tr style="background-color: #f9fafb;">
        <td style="padding: 8px; font-weight: bold;">Brand Name:</td>
        <td style="padding: 8px;">${userData.brandName}</td>
      </tr>
      <tr>
        <td style="padding: 8px; font-weight: bold;">Query:</td>
        <td style="padding: 8px;">${userData.message}</td>
      </tr>
    </table>

    <p style="margin-top: 25px; font-size: 15px; color: #555;">
      Please reach out to them as soon as possible.
    </p>
  </div>

  <!-- Footer -->
  <div style="background-color: #f9fafb; padding: 20px 30px; text-align: center; font-size: 13px; color: #888;">
    © ${new Date().getFullYear()} JewelTrain Admin Panel
  </div>
</div>
`,
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
