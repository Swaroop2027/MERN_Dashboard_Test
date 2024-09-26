import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const { Schema, model } = mongoose;

const employeeSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    mobileNumber: {
      type: String,
      required: [true, "Mobile number is required"],
    },
    designation: {
      type: String,
      enum: ["HR", "Manager", "Sales"],
      required: [true, "Designation is required"],
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: [true, "Gender is required"],
    },
    course: {
      type: String,
      enum: ["MCA", "BCA", "BSC"],
      required: [true, "Course is required"],
    },
    imageUrl: {
      type: String,
      required: [true, "Image is required"],
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

employeeSchema.plugin(mongoosePaginate);

const Employee = model("Employee", employeeSchema);
export default Employee;
