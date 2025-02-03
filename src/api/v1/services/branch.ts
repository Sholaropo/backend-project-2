import { BranchModel, IBranchDocument } from "../models/branch";

interface BranchData {
  name: string;
  address: string;
  phone: string;
}

interface IBranchService {
  create: (branchData: BranchData) => Promise<IBranchDocument>;
  readAll: () => Promise<IBranchDocument[]>;
  readSingle: (id: string) => Promise<IBranchDocument | null>;
  update: (id: string, updatedData: Partial<BranchData>) => Promise<IBranchDocument | null>;
  delete: (id: string) => Promise<IBranchDocument | null>;
}

export const branchesService: IBranchService = {
  create: async (branchData: BranchData): Promise<IBranchDocument> => {
    const newBranch: IBranchDocument = new BranchModel(branchData);
    return await newBranch.save();
  },

  readAll: async (): Promise<IBranchDocument[]> => {
    const branches: IBranchDocument[] = await BranchModel.find({});
    return branches;
  },

  readSingle: async (id: string): Promise<IBranchDocument | null> => {
    const branch: IBranchDocument | null = await BranchModel.findById(id);
    return branch;
  },

  update: async (id: string, updatedData: Partial<BranchData>): Promise<IBranchDocument | null> => {
    const updatedBranch: IBranchDocument | null = await BranchModel.findByIdAndUpdate(
      id,
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    );
    return updatedBranch;
  },

  delete: async (id: string): Promise<IBranchDocument | null> => {
    const deletedBranch: IBranchDocument | null = await BranchModel.findByIdAndRemove(id);
    return deletedBranch;
  },
};