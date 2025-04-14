"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const smpt_1 = __importDefault(require("../../Database/Model/common/SMPT/smpt"));
class CommonService {
    async sentMail(userData) {
        try {
            const SMPT_Details = await smpt_1.default.find({ service: "gmail" });
            const smpt_details = SMPT_Details[0];
            const transporter = nodemailer_1.default.createTransport({
                service: smpt_details.service,
                port: smpt_details.port,
                secure: false,
                auth: {
                    user: smpt_details.user,
                    pass: smpt_details.password,
                },
            });
            const receiver = {
                from: `JewelTrain<${smpt_details.user}>`,
                to: userData.email,
                subject: "Hello From JewelTrain",
                text: `Hello ${userData.name}, Thanks for connecting us, one of our executive connect with you as soon as possible`,
            };
            const info = await transporter.sendMail(receiver, (error, emailResponse) => {
                if (error) {
                    throw new Error(error);
                }
            });
            return true;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async sentAdminMail(userData) {
        try {
            const SMPT_Details = await smpt_1.default.find({ service: "gmail" });
            const smpt_details = SMPT_Details[0];
            const transporter = nodemailer_1.default.createTransport({
                service: smpt_details.service,
                port: smpt_details.port,
                secure: false,
                auth: {
                    user: smpt_details.user,
                    pass: smpt_details.password,
                },
            });
            const receiver = {
                from: `JewelTrain Admin new Client<${smpt_details.user}>`,
                to: smpt_details.admin_email,
                subject: "JewelTrain New Client Request",
                text: `Hello Admin, MR. ${userData.name} fill the new entry the follwing details of this guy :- number :- ${userData.number}, email :- ${userData.email}, brandName :- ${userData.brandName}. query :- ${userData.message}`,
            };
            const info = await transporter.sendMail(receiver, (error, emailResponse) => {
                if (error) {
                    throw new Error(error);
                }
                console.log("sucess");
            });
            return true;
        }
        catch (error) {
            throw new Error(error);
        }
    }
}
exports.default = CommonService;
