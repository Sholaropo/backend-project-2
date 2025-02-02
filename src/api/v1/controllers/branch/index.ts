import { branchesService } from "@services/branch";

export const branchesController = {
  create: async (req: any, res: any) => {
    const branch = await branchesService.create(req.body);
    res.status(201).json(branch);
  },

  readAll: async (req: any, res: any) => {
    const branches = await branchesService.readAll();
    res.json(branches);
  },

  readSingle: async (req: any, res: any) => {
    const branch = await branchesService.readSingle(req.params.id);
    res.json(branch);
  },

  update: async (req: any, res: any) => {
    const updatedBranch = await branchesService.update(
      req.params.id,
      req.body
    );
    res.json(updatedBranch);
  },

  delete: async (req: any, res: any) => {
    const isBranchDeleted = await branchesService.delete(req.params.id);
    if (isBranchDeleted) {
      res.status(204).end();
    }
  },
};
