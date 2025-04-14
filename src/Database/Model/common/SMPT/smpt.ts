import { string } from "joi";
import mongoose, { Schema, Document } from "mongoose";

interface ISmptDetail {
  service: string;
  host: string;
  port: Number;
  user: string;
  password: string;
  admin_email: string;
}


const SMPT_Details = new Schema<ISmptDetail>({
  service: {
    type: String,
  },
  host: {
    type: String,
  },
  port: {
    type: Number,
  },
  user: {
    type: String,
  },
  password: {
    type: String,
  },
  admin_email: {
    type: String,
  },
});

const smptModel = mongoose.model("SMPT_Details", SMPT_Details);

export default smptModel;