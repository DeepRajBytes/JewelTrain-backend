"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminauthController = void 0;
const adminauth_repository_1 = __importDefault(require("../../../repository/Adminauth/adminauth.repository"));
const config_json_1 = require("../../../config/common/config.json");
class AdminauthController {
    async signup(req, res) {
        try {
            const adminauthRepository = new adminauth_repository_1.default();
            const signupResponse = await adminauthRepository.signup(req.body);
            switch (signupResponse) {
                case 3:
                    return res
                        .status(config_json_1.config.statusCode.successful)
                        .json({ requestStatus: signupResponse, message: "WELCOME_SIR" });
                case 4:
                    return res
                        .status(config_json_1.config.statusCode.internalServer)
                        .json({
                        requestStatus: signupResponse,
                        message: "SORRY_FROM_MY_SIDE",
                    });
                case 1:
                    return res.status(config_json_1.config.statusCode.conflict).json({
                        requestStatus: signupResponse,
                        message: "EMAIL_EXIST",
                    });
                case 2:
                    return res.status(config_json_1.config.statusCode.conflict).json({
                        requestStatus: signupResponse,
                        message: "MOBILE_EXIST",
                    });
            }
        }
        catch (error) {
            throw new Error(error);
        }
    }
}
exports.AdminauthController = AdminauthController;
