import { employeesService } from "../services/employee";
import { Request, Response } from "express";

interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  branch: string;
}

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
    const employee: Employee = await employeesService.create(req.body);
    res.status(201).json(employee);
  },

  readAll: async (req: Request, res: Response): Promise<void> => {
    const employees: Employee[] = await employeesService.readAll();
    res.json(employees);
  },

  readSingle: async (req: Request, res: Response): Promise<void> => {
    const employee: Employee | null = await employeesService.readSingle(
      req.params.id
    );
    if (employee) {
      res.json(employee);
    } else {
      res.status(404).end();
    }
  },

  update: async (req: Request, res: Response): Promise<void> => {
    const updatedEmployee: Employee = await employeesService.update(
      req.params.id,
      req.body
    );
    res.json(updatedEmployee);
  },

  delete: async (req: Request, res: Response): Promise<void> => {
    const isEmployeeDeleted: boolean = await employeesService.delete(
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
    const employees: Employee[] = await employeesService.getByBranch(branchId);
    res.json(employees);
  },

  getByDepartment: async (
    req: Request<DepartmentParams>,
    res: Response
  ): Promise<void> => {
    const { departmentName } = req.params;
    const decodedDepartment: string = decodeURIComponent(departmentName);
    const employees: Employee[] = await employeesService.getByDepartment(
      decodedDepartment
    );
    res.json(employees);
  },
};
