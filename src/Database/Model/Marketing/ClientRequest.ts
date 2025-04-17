import { string } from "joi";
import mongoose, { Schema, Document } from "mongoose";

interface IClientsRequestDataType {
  name: string;
  lastname: string;
  brandName: string;
  email: string;
  number: Number;
  message: string;
}

const clientRequestData = new Schema<IClientsRequestDataType>(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      default: "sir",
    },
    brandName: {
      type: String,
      default: "NULL",
    },
    number: {
      type: Number,
      required: true,
    },
    message: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const ClientRequestModel = mongoose.model<IClientsRequestDataType>(
  "Clients",
  clientRequestData
);

export default ClientRequestModel;
