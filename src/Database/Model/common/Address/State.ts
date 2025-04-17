import mongoose, { Schema, Document } from "mongoose";

interface IStateSchemaType {
  StateName: string;
}

const StateSchema = new Schema<IStateSchemaType>(
  {
    StateName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const State = mongoose.model("State", StateSchema);
export default State;
