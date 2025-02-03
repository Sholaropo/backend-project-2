import mongoose, { Document, Schema, Model } from "mongoose";
import { BranchModel } from "./branch";

interface IEmployee {
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  branch: mongoose.Types.ObjectId | typeof BranchModel;
}

export interface IEmployeeDocument extends IEmployee, Document {}

const employeeSchema: Schema<IEmployeeDocument> = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  position: {
    type: String,
    required: true,
    trim: true,
  },
  department: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  branch: {
    type: Schema.Types.ObjectId,
    ref: "Branch",
    required: true,
  },
});

interface ITransformedEmployee extends Omit<IEmployee, "_id"> {
  id: string;
}

employeeSchema.set("toJSON", {
  transform: (
    _document: Document,
    returnedObject: Record<string, unknown>
  ): ITransformedEmployee => {
    return {
      id: returnedObject._id?.toString() ?? "",
      name: returnedObject.name as string,
      position: returnedObject.position as string,
      department: returnedObject.department as string,
      email: returnedObject.email as string,
      phone: returnedObject.phone as string,
      branch: returnedObject.branch as mongoose.Types.ObjectId,
    };
  },
});

export const EmployeeModel: Model<IEmployeeDocument> =
  mongoose.model<IEmployeeDocument>("Employee", employeeSchema);
