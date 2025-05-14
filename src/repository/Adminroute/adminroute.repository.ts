import { any, number, options } from "joi";
import { IAdminrouterepository } from "../contracts/Adminroute/i.adminroute.repository";
import UserModel from "../../Database/Model/Marketing/UserRequest";
import mongoose from "mongoose";

class Adminrouterepository implements IAdminrouterepository {
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
            state: "$stateInfo.name",
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

  async updateUser(req: any ): Promise <any> {
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

       const updatedUser = await UserModel.findByIdAndUpdate(_id , {$set : updateSet}, {new : true});
       
       if (updatedUser) {
        return {success : true , updatedData : updatedUser , data : "User Succesfully Updated"}
       } else {
        return {
          success: false,
          data: "User not Succesfully Updated",
        };
       }

    } catch (error:any) {
      throw new Error(error)
    }
  };
}

export default Adminrouterepository;
