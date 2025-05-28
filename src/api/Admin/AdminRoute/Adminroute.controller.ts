import { Request, Response } from "express";
import { config } from "../../../config/common/config.json";
import Adminrouterepository from "../../../repository/Adminroute/adminroute.repository";
export class AdminrouteController {

  // Users controller
  public async UsersList(req: Request, res: Response): Promise<any> {
    try {
      const adminrouteRepo = new Adminrouterepository();
      const page = parseInt(req.body.page) || 1;
      let limit = parseInt(req.body.limit) || 10;

      const allowedLimits = [10, 20, 50, 100];
      if (!allowedLimits.includes(limit)) {
        limit = 10;
      }
      const skip = (page - 1) * 10;

      const search = (req.query.search as string) || "";
      const sort = (req.query.sort as string) || "";
      const sortOptions = parseInt(req.query.sortOption as string) || -1;

      const Userlistresponse = await adminrouteRepo.Userlist({
        page,
        limit,
        skip,
        search,
        sort,
        sortOptions,
      });
      if (Userlistresponse) {
        res.status(200).json({
          success: true,
          data: Userlistresponse,
        });
      } else {
        res.status(config.statusCode.conflict).json({
          success: false,
          data: "USERS_NOT_FOUND",
        });
      }
    } catch (error: any) {
      res
        .status(config.statusCode.internalServer)
        .json({ error: error.message });
    }
  }

  public async Userdelete(req: Request, res: Response): Promise<any> {
    try {
      const userRepo = new Adminrouterepository();
      const deleteResponse = await userRepo.deleteUser(req);
      if (deleteResponse.success === 0) {
        res.status(config.statusCode.conflict).json({
          success: false,
          data: deleteResponse.data,
        });
      } else {
        res.status(config.statusCode.successful).json({
          success: true,
          data: deleteResponse.data,
        });
      }
    } catch (error: any) {
      res
        .status(config.statusCode.internalServer)
        .json({ error: error.message });
    }
  }

  public async updateUser(req: Request, res: Response): Promise<any> {
    try {
      const updateRepo = new Adminrouterepository();
      const updatedUSer = await updateRepo.updateUser(req);
      console.log("updatedUSer", updatedUSer);
      if (updatedUSer.success === true) {
        res
          .status(config.statusCode.successful)
          .json({ success: true, data: updatedUSer });
      } else {
        res
          .status(config.statusCode.conflict)
          .json({ success: false, data: "User update fail Please try again" });
      }
    } catch (error: any) {
      res
        .status(config.statusCode.internalServer)
        .json({ error: error.message });
    }
  }

  public async UserDetails(req: Request, res: Response): Promise<any> {
    try {
      const updateRepo = new Adminrouterepository();
      const userId = req.params.id;
      console.log(userId);
      const UserInfo = await updateRepo.userDetails(userId);
      if (UserInfo.success === true) {
        res
          .status(config.statusCode.successful)
          .json({ success: true, data: UserInfo });
      } else {
        res
          .status(config.statusCode.conflict)
          .json({ success: false, data: "User Not present in database" });
      }
    } catch (error: any) {
      res
        .status(config.statusCode.internalServer)
        .json({ error: error.message });
    }
  }

  public async ActionUser(req: Request, res: Response): Promise<any> {
    try {
      const userRepo = new Adminrouterepository();
      const actionResponse = await userRepo.actionUser(req);
      if (actionResponse.success === 0) {
        res.status(config.statusCode.conflict).json({
          success: false,
          data: actionResponse.data,
        });
      } else {
        res.status(config.statusCode.successful).json({
          success: true,
          data: actionResponse.data,
        });
      }
    } catch (error: any) {
      res
        .status(config.statusCode.internalServer)
        .json({ error: error.message });
    }
  }


  // client controllers

  public async ClientList(req: Request, res: Response): Promise<any> {
    try {
      const adminrouteRepo = new Adminrouterepository();
      const page = parseInt(req.body.page) || 1;
      let limit = parseInt(req.body.limit) || 10;

      const allowedLimits = [10, 20, 50, 100];
      if (!allowedLimits.includes(limit)) {
        limit = 10;
      }
      const skip = (page - 1) * 10;

      const search = (req.query.search as string) || "";
      const sort = (req.query.sort as string) || "";
      const sortOptions = parseInt(req.query.sortOption as string) || -1;

      const Userlistresponse = await adminrouteRepo.ClientList({
        page,
        limit,
        skip,
        search,
        sort,
        sortOptions,
      });
      if (Userlistresponse) {
        res.status(200).json({
          success: true,
          data: Userlistresponse,
        });
      } else {
        res.status(config.statusCode.conflict).json({
          success: false,
          data: "USERS_NOT_FOUND",
        });
      }
    } catch (error: any) {
      res
        .status(config.statusCode.internalServer)
        .json({ error: error.message });
    }
  }

  public async ClientDetails(req: Request, res: Response): Promise<any> {
    try {
      const updateRepo = new Adminrouterepository();
      const userId = req.params.id;
      console.log(userId);
      const UserInfo = await updateRepo.clientDetails(userId);
      if (UserInfo.success === true) {
        res
          .status(config.statusCode.successful)
          .json({ success: true, data: UserInfo });
      } else {
        res
          .status(config.statusCode.conflict)
          .json({ success: false, data: "User Not present in database" });
      }
    } catch (error: any) {
      res
        .status(config.statusCode.internalServer)
        .json({ error: error.message });
    }
  }

  public async Clientdelete(req: Request, res: Response): Promise<any> {
    try {
      const userRepo = new Adminrouterepository();
      const deleteResponse = await userRepo.deleteClient(req);
      if (deleteResponse.success === 0) {
        res.status(config.statusCode.conflict).json({
          success: false,
          data: deleteResponse.data,
        });
      } else {
        res.status(config.statusCode.successful).json({
          success: true,
          data: deleteResponse.data,
        });
      }
    } catch (error: any) {
      res
        .status(config.statusCode.internalServer)
        .json({ error: error.message });
    }
  }

  public async updateClient(req: Request, res: Response): Promise<any> {
    try {
      const updateRepo = new Adminrouterepository();
      const updatedUSer = await updateRepo.updateClient(req);
      if (updatedUSer.success === true) {
        res
          .status(config.statusCode.successful)
          .json({ success: true, data: updatedUSer });
      } else {
        res
          .status(config.statusCode.conflict)
          .json({ success: false, data: "User update fail Please try again" });
      }
    } catch (error: any) {
      res
        .status(config.statusCode.internalServer)
        .json({ error: error.message });
    }
  }

  public async ActionClient(req: Request, res: Response): Promise<any> {
    try {
      const clientRepo = new Adminrouterepository();
      const actionResponse = await clientRepo.actionClient(req);
      if (actionResponse.success === 0) {
        res.status(config.statusCode.conflict).json({
          success: false,
          data: actionResponse.data,
        });
      } else {
        res.status(config.statusCode.successful).json({
          success: true,
          data: actionResponse.data,
        });
      }
    } catch (error: any) {
      res
        .status(config.statusCode.internalServer)
        .json({ error: error.message });
    }
  }
}
