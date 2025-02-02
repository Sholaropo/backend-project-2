const Branch = require("../models/branch");

interface BranchData {
  name: string;
  address: string;
  phone: string;
}

export const branchesService = {
  create: async (branchData: BranchData) => {
    const newBranch = new Branch(branchData);
    return await newBranch.save();
  },

  readAll: async () => {
    const branches = await Branch.find({});
    return branches;
  },

  readSingle: async (id: string) => {
    const branch = await Branch.findById(id);
    return branch;
  },

  update: async (id: string, updatedData: Partial<BranchData>) => {
    const updatedBranch = await Branch.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    return updatedBranch;
  },

  delete: async (id: string) => {
    const isBranchDeleted = await Branch.findByIdAndRemove(id);
    return isBranchDeleted;
  },
};
