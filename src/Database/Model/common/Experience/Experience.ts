import mongoose, { Schema, Document } from "mongoose";

interface IExperienceSchemaType {
  experienceValue:string;
}

// Define the Experience Schema
const ExperienceSchema = new Schema<IExperienceSchemaType>(
  {
    experienceValue: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Experience = mongoose.model("Experience", ExperienceSchema);
export default Experience;
