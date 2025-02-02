import { branchesService } from "../services/branch";
import { Request, Response } from "express";

interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
}

export const branchesController: {
  create: (req: Request, res: Response) => Promise<void>;
  readAll: (req: Request, res: Response) => Promise<void>;
  readSingle: (req: Request, res: Response) => Promise<void>;
  update: (req: Request, res: Response) => Promise<void>;
  delete: (req: Request, res: Response) => Promise<void>;
} = {
  create: async (req: Request, res: Response): Promise<void> => {
    const branch: Branch = await branchesService.create(req.body);
    res.status(201).json(branch);
  },

  readAll: async (req: Request, res: Response): Promise<void> => {
    const branches: Branch[] = await branchesService.readAll();
    res.json(branches);
  },

  readSingle: async (req: Request, res: Response): Promise<void> => {
    const branch: Branch | null = await branchesService.readSingle(req.params.id);
    if (branch) {
      res.json(branch);
    } else {
      res.status(404).end();
    }
  },

  update: async (req: Request, res: Response): Promise<void> => {
    const updatedBranch: Branch = await branchesService.update(req.params.id, req.body);
    res.json(updatedBranch);
  },

  delete: async (req: Request, res: Response): Promise<void> => {
    const isBranchDeleted: boolean = await branchesService.delete(req.params.id);
    if (isBranchDeleted) {
      res.status(204).end();
    }
  },
};