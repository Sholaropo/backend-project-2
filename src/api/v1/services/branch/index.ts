const Branch = require("../../models/branch");

export const branchesService = {
  create: async (branchData: any) => {
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

  update: async (id: string, updatedData: any) => {
    const updatedBranch = await Branch.findByIdAndUpdate(id, updatedData, {new: true});
    return updatedBranch;
  },

  delete: async (id: string) => {
    const isBranchDeleted = await Branch.findByIdAndRemove(id);
    return isBranchDeleted
  },
};
