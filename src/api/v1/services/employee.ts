import { EmployeeModel, IEmployeeDocument } from "../models/employee";

interface EmployeeData {
 name: string;
 position: string;
 department: string;
 email: string;
 phone: string;
 branch: string;
}

interface IEmployeeService {
 create: (employeeData: EmployeeData) => Promise<IEmployeeDocument>;
 readAll: () => Promise<IEmployeeDocument[]>;
 readSingle: (id: string) => Promise<IEmployeeDocument | null>;
 update: (id: string, updatedData: Partial<EmployeeData>) => Promise<IEmployeeDocument | null>;
 delete: (id: string) => Promise<IEmployeeDocument | null>;
 getByBranch: (branchId: string) => Promise<IEmployeeDocument[]>;
 getByDepartment: (departmentName: string) => Promise<IEmployeeDocument[]>;
}

export const employeesService: IEmployeeService = {
 create: async (employeeData: EmployeeData): Promise<IEmployeeDocument> => {
   const newEmployee: IEmployeeDocument = new EmployeeModel(employeeData);
   return await newEmployee.save();
 },

 readAll: async (): Promise<IEmployeeDocument[]> => {
   const employees: IEmployeeDocument[] = await EmployeeModel.find({}).populate("branch", {
     name: 1,
     address: 1,
     phone: 1,
   });
   return employees;
 },

 readSingle: async (id: string): Promise<IEmployeeDocument | null> => {
   const employee: IEmployeeDocument | null = await EmployeeModel.findById(id).populate("branch", {
     name: 1,
     address: 1,
     phone: 1,
   });
   return employee;
 },

 update: async (id: string, updatedData: Partial<EmployeeData>): Promise<IEmployeeDocument | null> => {
   const updatedEmployee: IEmployeeDocument | null = await EmployeeModel.findByIdAndUpdate(
     id, 
     updatedData, 
     {
       new: true,
       runValidators: true,
     }
   );
   return updatedEmployee;
 },

 delete: async (id: string): Promise<IEmployeeDocument | null> => {
   const deletedEmployee: IEmployeeDocument | null = await EmployeeModel.findByIdAndRemove(id);
   return deletedEmployee;
 },

 getByBranch: async (branchId: string): Promise<IEmployeeDocument[]> => {
   const employees: IEmployeeDocument[] = await EmployeeModel.find({ branch: branchId })
     .populate("branch", {
       name: 1,
       address: 1,
       phone: 1,
     });
   return employees;
 },

 getByDepartment: async (departmentName: string): Promise<IEmployeeDocument[]> => {
   const employees: IEmployeeDocument[] = await EmployeeModel.find({
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