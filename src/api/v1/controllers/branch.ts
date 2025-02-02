import { branchesService } from "@services/branch";
import { Request, Response } from "express";

export const branchesController = {
  create: async (req: Request, res: Response) => {
    const branch = await branchesService.create(req.body);
    res.status(201).json(branch);
  },

  readAll: async (req: Request, res: Response) => {
    const branches = await branchesService.readAll();
    res.json(branches);
  },

  readSingle: async (req: Request, res: Response) => {
    const branch = await branchesService.readSingle(req.params.id);
    res.json(branch);
  },

  update: async (req: Request, res: Response) => {
    const updatedBranch = await branchesService.update(
      req.params.id,
      req.body
    );
    res.json(updatedBranch);
  },

  delete: async (req: Request, res: Response) => {
    const isBranchDeleted = await branchesService.delete(req.params.id);
    if (isBranchDeleted) {
      res.status(204).end();
    }
  },
};
