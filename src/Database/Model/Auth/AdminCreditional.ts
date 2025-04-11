import mongoose, { Schema, Document } from "mongoose";

interface IAdminCreditional {
  password: string;
  email: string;
  mobile: number;
}

const adminCredential = new Schema<IAdminCreditional>({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    unique: true,
    required: true
  },
});

const AdmincredentialModel = mongoose.model<IAdminCreditional>(
  "Admincredential",
  adminCredential
);

export default AdmincredentialModel;