const Employee = require("../../models/employee");
import { EmployeeType } from "types";

export const employeesService = {
  create: async (employee: any) => {
    const newEmployee = new Employee(employee);
    return await newEmployee.save();
  },

  readAll: async () => {
    const employees = await Employee.find({});
    return employees;
  },

  readSingle: async (id: string) => {
    const employee = await Employee.findById(id);
    return employee;
  },
};
