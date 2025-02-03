import { IEmployeeDocument } from "../models/employee";
import { employeesService } from "../services/employee";
import { Request, Response } from "express";

interface BranchParams {
  branchId: string;
}

interface DepartmentParams {
  departmentName: string;
}

export const employeesController: {
  create: (req: Request, res: Response) => Promise<void>;
  readAll: (req: Request, res: Response) => Promise<void>;
  readSingle: (req: Request, res: Response) => Promise<void>;
  update: (req: Request, res: Response) => Promise<void>;
  delete: (req: Request, res: Response) => Promise<void>;
  getByBranch: (req: Request<BranchParams>, res: Response) => Promise<void>;
  getByDepartment: (
    req: Request<DepartmentParams>,
    res: Response
  ) => Promise<void>;
} = {
  create: async (req: Request, res: Response): Promise<void> => {
    const employee: IEmployeeDocument = await employeesService.create(req.body);
    res.status(201).json(employee);
  },

  readAll: async (req: Request, res: Response): Promise<void> => {
    const employees: IEmployeeDocument[] = await employeesService.readAll();
    res.json(employees);
  },

  readSingle: async (req: Request, res: Response): Promise<void> => {
    const employee: IEmployeeDocument | null = await employeesService.readSingle(
      req.params.id
    );
    if (employee) {
      res.json(employee);
    } else {
      res.status(404).end();
    }
  },

  update: async (req: Request, res: Response): Promise<void> => {
    const updatedEmployee: IEmployeeDocument | null = await employeesService.update(
      req.params.id,
      req.body
    );
    res.json(updatedEmployee);
  },

  delete: async (req: Request, res: Response): Promise<void> => {
    const isEmployeeDeleted: IEmployeeDocument | null = await employeesService.delete(
      req.params.id
    );
    if (isEmployeeDeleted) {
      res.status(204).end();
    }
  },

  getByBranch: async (
    req: Request<BranchParams>,
    res: Response
  ): Promise<void> => {
    const { branchId } = req.params;
    const employees: IEmployeeDocument[] = await employeesService.getByBranch(branchId);
    res.json(employees);
  },

  getByDepartment: async (
    req: Request<DepartmentParams>,
    res: Response
  ): Promise<void> => {
    const { departmentName } = req.params;
    const decodedDepartment: string = decodeURIComponent(departmentName);
    const employees: IEmployeeDocument[] = await employeesService.getByDepartment(
      decodedDepartment
    );
    res.json(employees);
  },
};
