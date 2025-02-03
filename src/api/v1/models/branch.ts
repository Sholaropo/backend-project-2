import mongoose, { Document, Schema, Model } from "mongoose";

interface IBranch {
  name: string;
  address: string;
  phone: string;
}

export interface IBranchDocument extends IBranch, Document {}

const branchSchema: Schema<IBranchDocument> = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  }
});

interface ITransformedBranch extends Omit<IBranch, '_id'> {
  id: string;
}

branchSchema.set("toJSON", {
  transform: (_document: Document, returnedObject: Record<string, unknown>): ITransformedBranch => {
    return {
      id: returnedObject._id?.toString() ?? '',
      name: returnedObject.name as string,
      address: returnedObject.address as string,
      phone: returnedObject.phone as string
    };
  },
});

export const BranchModel: Model<IBranchDocument> = mongoose.model<IBranchDocument>("Branch", branchSchema);