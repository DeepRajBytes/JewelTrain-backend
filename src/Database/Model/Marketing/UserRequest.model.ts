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
  active: boolean;
  blockAdmin: boolean;
}

const UserRequestdata = new Schema<IUserRequestDatatype>(
  {
    about: {
      type: String,
    },
    resumelink: { type: String },
    firstname: { type: String, index: true },
    lastname: { type: String, index: true },
    email: { type: String, unique: true },
    number: { type: Number, unique: true },
    country: { type: String },
    street: { type: String },
    city: { type: String, index: true },
    state: { type: mongoose.Schema.Types.ObjectId, ref: "State" },
    expirence: { type: mongoose.Schema.Types.ObjectId, ref: "Experience" },
    currentorg: { type: String },
    currentctc: { type: String },
    expectctc: { type: String },
    relocate: { type: Boolean, default: true },
    retailExp: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
    blockAdmin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

UserRequestdata.index({ firstname: 1, lastname: 1 });
UserRequestdata.index({ email: 1, firstname: 1 });

const UserModel = mongoose.model<IUserRequestDatatype>(
  "Users",
  UserRequestdata
);

export default UserModel;
