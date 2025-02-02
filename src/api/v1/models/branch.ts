import mongoose, { Document, Schema } from "mongoose";

interface IBranch {
  name: string;
  address: string;
  phone: string;
}

interface IBranchDocument extends IBranch, Document {}

const schema: Schema<IBranchDocument> = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  }
});

schema.set("toJSON", {
  transform: (document: Document, returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const BranchModel = mongoose.model<IBranchDocument>("Branch", schema);
