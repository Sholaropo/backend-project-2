import { employeesService } from "@services/employee";

export const employeesController = {
  create: async (req: any, res: any) => {
    const employee = await employeesService.create(req.body);
    res.status(201).json(employee);
  },

  readAll: async (req: any, res: any) => {
    const employees = await employeesService.readAll();
    res.json(employees);
  },

  readSingle: async (req: any, res: any) => {
    const employee = await employeesService.readSingle(req.params.id);
    res.json(employee);
  },

  update: async (req: any, res: any) => {
    const updatedEmployee = await employeesService.update(
      req.params.id,
      req.body
    );
    res.json(updatedEmployee);
  },

  delete: async (req: any, res: any) => {
    const isEmployeeDeleted = await employeesService.delete(req.params.id);
    if (isEmployeeDeleted) {
      res.status(204).end();
    }
  },
};
