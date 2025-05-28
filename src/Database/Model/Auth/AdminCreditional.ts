import mongoose, { Schema, Document } from "mongoose";

interface IAdminCreditional {
  password: string;
  email: string;
  mobile: number;
  accessLevel: "low" | "medium" | "high";
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
    required: true,
  },
  accessLevel: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "low",
    required: true,
  },
});

const AdmincredentialModel = mongoose.model<IAdminCreditional>(
  "Admincredential",
  adminCredential
);

export default AdmincredentialModel;