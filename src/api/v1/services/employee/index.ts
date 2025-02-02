const Employee = require("../../models/employee");
import { EmployeeType } from "types";

export const employeesService = {
  create: async (employeeData: any) => {
    const newEmployee = new Employee(employeeData);
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

  update: async (id: string, updatedData: any) => {
    const updatedEmployee = await Employee.findByIdAndUpdate(id, updatedData, {new: true});
    return updatedEmployee;
  },
};
