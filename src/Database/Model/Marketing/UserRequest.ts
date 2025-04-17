import mongoose, { Schema, Document } from "mongoose";
import Experience from "../common/Experience/Experience";
import State from "../common/Address/State";

interface IUserRequestDatatype {
  about: string;
  resumelink: string;
  firstname: string;
  lastname: string;
  email: string;
  number: number;
  country: string;
  street: string;
  city: string;
  state: mongoose.Types.ObjectId;
  expirence: mongoose.Types.ObjectId;
  currentorg: string;
  currentctc: string;
  expectctc: string;
  relocate: boolean;
  retailExp: boolean;
}

const UserRequestdata = new Schema<IUserRequestDatatype>(
  {
    about: {
      type: String,
    },
    resumelink: { type: String },
    firstname: { type: String },
    lastname: { type: String },
    email: { type: String },
    number: { type: Number },
    country: { type: String },
    street: { type: String },
    city: { type: String },
    state: { type: mongoose.Schema.Types.ObjectId, ref: "State" },
    expirence: { type: mongoose.Schema.Types.ObjectId, ref: "Experience" },
    currentorg: { type: String },
    currentctc: { type: String },
    expectctc: { type: String },
    relocate: { type: Boolean, default: true },
    retailExp: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model<IUserRequestDatatype>(
  "Users",
  UserRequestdata
);

export default UserModel;
