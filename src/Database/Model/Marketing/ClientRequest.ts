import mongoose, { Schema, Document } from "mongoose";

interface IClientsRequestDataType {
  name: string,
  lastname: string,
  brandName: string,
  email: string,
  number: string,
  message: string
}

const clientRequestData = new Schema<IClientsRequestDataType>({

})

const ClientRequestModel = mongoose.model<IClientsRequestDataType>(
  "ClientRequest",
  clientRequestData
);

export default ClientRequestModel;