import { IAdminrouterepository } from "../contracts/Adminroute/i.adminroute.repository";
import UserModel from "../../Database/Model/Marketing/UserRequest.model";
import mongoose from "mongoose";
import ClientRequestModel from "../../Database/Model/Marketing/ClientRequest.model";

class Adminrouterepository implements IAdminrouterepository {
  // User functions
  async Userlist(req: any): Promise<any> {
    try {
      const { page, limit, skip, search = "", sort, sortOptions } = req;
      const searchFilter = search
        ? {
            $or: [
              { firstname: { $regex: search, $options: "i" } },
              { lastName: { $regex: search, $options: "i" } },
              { email: { $regex: search, $options: "i" } },
              { number: { $regex: search, $options: "i" } },
              { city: { $regex: search, $options: "i" } },
              { currentorg: { $regex: search, $options: "i" } },
            ],
          }
        : {};

      const sortOption: Record<string, 1 | -1> = sort
        ? { [sort]: sortOptions }
        : { createdAt: sortOptions };
      const pipeline = [
        { $match: searchFilter },
        { $sort: sortOption },
        {
          $lookup: {
            from: "states",
            localField: "state",
            foreignField: "_id",
            as: "stateInfo",
          },
        },
        { $unwind: "$stateInfo" },
        {
          $lookup: {
            from: "experiences",
            localField: "expirence",
            foreignField: "_id",
            as: "experienceInfo",
          },
        },
        { $unwind: "$experienceInfo" },
        {
          $project: {
            firstname: 1,
            lastName: 1,
            email: 1,
            number: 1,
            city: 1,
            currentorg: 1,
            resumelink: 1,
            state: "$stateInfo.StateName",
            experience: "$experienceInfo.ExperienceRange",
          },
        },
        {
          $facet: {
            metaData: [{ $count: "total" }],
            data: [{ $skip: skip || 0 }, { $limit: limit || 10 }],
          },
        },
      ];

      const result = await UserModel.aggregate(pipeline);
      const metadata = result[0]?.metaData[0];
      const users = result[0]?.data;
      return {
        page,
        limit,
        totalUsers: metadata.total,
        totalPages: Math.ceil(metadata.total / limit),
        users,
      };
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async deleteUser(req: any): Promise<any> {
    try {
      const { id } = req.query;
      const userPresence = await UserModel.findOne({ _id: id });
      if (!userPresence) {
        return { sucess: 0, data: "Sorry admin this user not present" };
      }
      const deleteID = await UserModel.deleteOne({ _id: id });
      if (deleteID) {
        return { sucess: 1, data: "User delete Sucessfull from database" };
      }
      return {
        sucess: 0,
        data: "Sorry admin something went wrong from our end",
      };
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async updateUser(req: any): Promise<any> {
    try {
      const allowedFields = [
        "about",
        "firstname",
        "lastname",
        "email",
        "number",
        "country",
        "street",
        "city",
        "state",
        "expirence",
        "currentorg",
        "currentctc",
        "expectctc",
        "relocate",
        "retailExp",
        "active",
      ];
      const { _id } = req.body;

      if (!_id) {
        return { success: false, message: "_id is required for updating." };
      }

      const updateSet: any = {};
      for (let key of Object.keys(req.body)) {
        if (allowedFields.includes(key)) {
          if (["state", "expirence"].includes(key)) {
            updateSet[key] = new mongoose.Types.ObjectId(req.body[key]);
          } else {
            updateSet[key] = req.body[key];
          }
        }
      }

      const updatedUser = await UserModel.findByIdAndUpdate(
        _id,
        { $set: updateSet },
        { new: true }
      );
      console.log("updatedUser", updatedUser);

      if (updatedUser) {
        return {
          success: true,
          updatedData: updatedUser,
          data: "User Succesfully Updated",
        };
      } else {
        return {
          success: false,
          data: "User not Succesfully Updated",
        };
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async actionUser(req: any): Promise<any> {
    try {
      const { id } = req.query;
      const { action } = req.query;
      const userPresence = await UserModel.findOne({ _id: id });
      if (!userPresence) {
        return { sucess: 0, data: "Sorry admin this user not present" };
      }
      let blockAdmin: boolean;
      let active: boolean;

      if (action === "BLOCK") {
        blockAdmin = true;
        active = false;
      } else if (action === "UNBLOCK") {
        blockAdmin = false;
        active = true;
      } else {
        return { success: 0, data: "Invalid action provided" };
      }
      const updateResult = await UserModel.updateOne(
        { _id: id },
        {
          blockAdmin,
          active,
        }
      );
      if (updateResult.modifiedCount > 0) {
        return { sucess: 1, data: `User ${action} succesfully ` };
      }
      return {
        sucess: 0,
        data: "No changes were made. Maybe the user is already in the desired state",
      };
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async userDetails(_id: any): Promise<any> {
    try {
      if (!_id) {
        return { success: false, message: "User not Present in the Database" };
      }
      const UserInfo = await UserModel.findById(_id)
        .populate("state", "StateName")
        .populate("expirence", "ExperienceRange");
      if (!UserInfo) {
        return { success: false, message: "User not Present in the Database" };
      }
      return { success: true, data: UserInfo };
    } catch (error: any) {
      throw new Error(error);
    }
  }

  // Client functions
  async ClientList(req: any): Promise<any> {
    try {
      const { page, limit, skip, search = "", sort, sortOptions } = req;
      const searchFilter = search
        ? {
            $or: [
              { name: { $regex: search, $options: "i" } },
              { brandName: { $regex: search, $options: "i" } },
              { email: { $regex: search, $options: "i" } },
              { number: { $regex: search, $options: "i" } },
              { lastname: { $regex: search, $options: "i" } },
            ],
          }
        : {};

      const sortOption: Record<string, 1 | -1> = sort
        ? { [sort]: sortOptions }
        : { createdAt: sortOptions };
      const pipeline = [
        { $match: searchFilter },
        { $sort: sortOption },
        {
          $project: {
            _id: 1,
            name: 1,
            lastName: 1,
            email: 1,
            number: 1,
            brandName: 1,
            currentorg: 1,
            resumelink: 1,
            message: 1,
            createdAt: 1,
            updatedAt: 1,
          },
        },
        {
          $facet: {
            metaData: [{ $count: "total" }],
            data: [{ $skip: skip || 0 }, { $limit: limit || 10 }],
          },
        },
      ];

      const result = await ClientRequestModel.aggregate(pipeline);
      const metadata = result[0]?.metaData[0];
      const Clients = result[0]?.data;
      return {
        page,
        limit,
        totalClients: metadata.total,
        totalPages: Math.ceil(metadata.total / limit),
        Clients,
      };
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async clientDetails(_id: any): Promise<any> {
    try {
      if (!_id) {
        return { success: false, message: "User not Present in the Database" };
      }
      const UserInfo = await ClientRequestModel.findById(_id);
      if (!UserInfo) {
        return { success: false, message: "User not Present in the Database" };
      }
      return { success: true, data: UserInfo };
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async deleteClient(req: any): Promise<any> {
    try {
      const { id } = req.query;
      const userPresence = await ClientRequestModel.findOne({ _id: id });
      if (!userPresence) {
        return { sucess: 0, data: "Sorry admin this client not present" };
      }
      const deleteID = await ClientRequestModel.deleteOne({ _id: id });
      if (deleteID) {
        return { sucess: 1, data: "Client delete Sucessfull from database" };
      }
      return {
        sucess: 0,
        data: "Sorry admin something went wrong from our end",
      };
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async updateClient(req: any): Promise<any> {
    try {
      const allowedFields = [
        "name",
        "lastname",
        "email",
        "number",
        "address",
        "brandName",
        "message",
        "blockAdmin",
      ];
      const { _id } = req.body;

      if (!_id) {
        return { success: false, message: "_id is required for updating." };
      }

      const updateSet: any = {};
      for (let key of Object.keys(req.body)) {
        if (allowedFields.includes(key)) {
          updateSet[key] = req.body[key];
        }
      }

      const updatedClient = await ClientRequestModel.findByIdAndUpdate(
        _id,
        { $set: updateSet },
        { new: true }
      );
      console.log("updatedUser", updatedClient);

      if (updatedClient) {
        return {
          success: true,
          updatedData: updatedClient,
          data: "Client Succesfully Updated",
        };
      } else {
        return {
          success: false,
          data: "Client not Succesfully Updated",
        };
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async actionClient(req: any): Promise<any> {
    try {
      const { id } = req.query;
      const { action } = req.query;
      const clientPresence = await ClientRequestModel.findOne({ _id: id });
      if (!clientPresence) {
        return { sucess: 0, data: "Sorry admin this Client not present" };
      }
      let blockAdmin: boolean;
      let active: boolean;

      if (action === "BLOCK") {
        blockAdmin = true;
        active = false;
      } else if (action === "UNBLOCK") {
        blockAdmin = false;
        active = true;
      } else {
        return { success: 0, data: "Invalid action provided" };
      }
      const updateResult = await ClientRequestModel.updateOne(
        { _id: id },
        {
          blockAdmin,
          active,
        }
      );
      if (updateResult.modifiedCount > 0) {
        return { sucess: 1, data: `Client ${action} succesfully ` };
      }
      return {
        sucess: 0,
        data: "No changes were made. Maybe the Client is already in the desired state",
      };
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export default Adminrouterepository;
