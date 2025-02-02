const Employee = require("../models/employee");

export const employeesService = {
  create: async (employeeData: any) => {
    const newEmployee = new Employee(employeeData);
    return await newEmployee.save();
  },

  readAll: async () => {
    const employees = await Employee.find({}).populate("branch", {
      name: 1,
      address: 1,
      phone: 1,
    });
    return employees;
  },

  readSingle: async (id: string) => {
    const employee = await Employee.findById(id).populate("branch", {
      name: 1,
      address: 1,
      phone: 1,
    });
    return employee;
  },

  update: async (id: string, updatedData: any) => {
    const updatedEmployee = await Employee.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    return updatedEmployee;
  },

  delete: async (id: string) => {
    const isEmployeeDeleted = await Employee.findByIdAndRemove(id);
    return isEmployeeDeleted;
  },

  getByBranch: async (branchId: string) => {
    const employees = await Employee.find({ branch: branchId }).populate(
      "branch",
      {
        name: 1,
        address: 1,
        phone: 1,
      }
    );
    return employees;
  },

  getByDepartment: async (departmentName: string) => {
    const employees = await Employee.find({
      department: {
        $regex: new RegExp(departmentName, "i"),
      },
    }).populate("branch", {
      name: 1,
      address: 1,
      phone: 1,
    });

    return employees;
  },
};
