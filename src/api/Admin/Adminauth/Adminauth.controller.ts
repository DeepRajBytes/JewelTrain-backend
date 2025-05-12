import { Request, Response } from "express";
import AdminauthRepository from "../../../repository/Adminauth/adminauth.repository";
import { config } from "../../../config/common/config.json";

export class AdminauthController {
  public async signup(req: Request, res: Response): Promise<any> {
    try {
      const adminauthRepository = new AdminauthRepository();
      const signupResponse: number = await adminauthRepository.signup(req.body);
      switch (signupResponse) {
        case 3:
          return res
            .status(config.statusCode.successful)
            .json({ requestStatus: signupResponse, message: "WELCOME_SIR" });
        case 4:
          return res.status(config.statusCode.internalServer).json({
            requestStatus: signupResponse,
            message: "SORRY_FROM_MY_SIDE",
          });
        case 1:
          return res.status(config.statusCode.conflict).json({
            requestStatus: signupResponse,
            message: "EMAIL_EXIST",
          });
        case 2:
          return res.status(config.statusCode.conflict).json({
            requestStatus: signupResponse,
            message: "MOBILE_EXIST",
          });
      }
    } catch (error: any) {
      res
        .status(config.statusCode.internalServer)
        .json({ error: error.message });
    }
  }

  public async signin(req: Request, res: Response): Promise<any> {
    try {
      const adminauthRepository = new AdminauthRepository();
      const signupResponse: number = await adminauthRepository.signin(req.body);
      switch (signupResponse) {
        case 3:
          return res
            .status(config.statusCode.conflict)
            .json({ requestStatus: signupResponse, message: "WRONG_PASSWORD" });
        case 4:
          return res.status(config.statusCode.internalServer).json({
            requestStatus: signupResponse,
            message: "INTERNAL_SERVE",
          });
        case 1:
          return res.status(config.statusCode.conflict).json({
            requestStatus: signupResponse,
            message: "EMAIL_NOT_EXIST",
          });
        case 2:
          return res.status(config.statusCode.conflict).json({
            requestStatus: signupResponse,
            message: "MOBILE_NOT_EXIST",
          });
        default:
          return res.status(config.statusCode.successful).json({
            data: signupResponse,
            message: "WELCOME_BOSS",
          });
      }
    } catch (error: any) {
      res
        .status(config.statusCode.internalServer)
        .json({ error: error.message });
    }
  }
}
