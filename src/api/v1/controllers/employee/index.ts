import { employeesService } from "@services/employee";
import { Request, Response } from "express";

interface BranchParams {
  branchId: string;
}

export const employeesController = {
  create: async (req: Request, res: Response) => {
    const employee = await employeesService.create(req.body);
    res.status(201).json(employee);
  },

  readAll: async (req: Request, res: Response) => {
    const employees = await employeesService.readAll();
    res.json(employees);
  },

  readSingle: async (req: Request, res: Response) => {
    const employee = await employeesService.readSingle(req.params.id);
    res.json(employee);
  },

  update: async (req: Request, res: Response) => {
    const updatedEmployee = await employeesService.update(
      req.params.id,
      req.body
    );
    res.json(updatedEmployee);
  },

  delete: async (req: Request, res: Response) => {
    const isEmployeeDeleted = await employeesService.delete(req.params.id);
    if (isEmployeeDeleted) {
      res.status(204).end();
    }
  },

  getByBranch: async (req: Request<BranchParams>, res: Response) => {
    const { branchId } = req.params;
    const employees = await employeesService.getByBranch(branchId);
    res.json(employees);
  },
};
