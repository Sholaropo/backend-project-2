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

};
