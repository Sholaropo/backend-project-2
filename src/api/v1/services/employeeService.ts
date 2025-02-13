/**
 * @interface Employee
 * @description Represents an employee object.
 */
export type Employee = {
  id: string;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  branchId: string;
};

const employees: Employee[] = [];

/**
 * @description Get all employees.
 * @returns {Promise<Employee[]>}
 */
export const getAllEmployees = async (): Promise<Employee[]> => {
  return employees;
};

/**
 * @description Get a single employee by ID.
 * @param {string} id - The ID of the employee to retrieve.
 * @returns {Promise<Employee>}
 * @throws {Error} If the employee with the given ID is not found.
 */
export const getEmployeeById = async (id: string): Promise<Employee> => {
  const employee = employees.find((e) => e.id === id);
  if (!employee) {
    throw new Error(`Employee with ID ${id} not found`);
  }
  return employee;
};

/**
 * @description Get employees by branch ID.
 * @param {string} branchId - The ID of the branch.
 * @returns {Promise<Employee[]>}
 */
export const getEmployeesByBranch = async (branchId: string): Promise<Employee[]> => {
  return employees.filter((employee) => employee.branchId === branchId);
};

/**
 * @description Get employees by department.
 * @param {string} department - The department name.
 * @returns {Promise<Employee[]>}
 */
export const getEmployeesByDepartment = async (department: string): Promise<Employee[]> => {
  return employees.filter((employee) => employee.department.toLowerCase() === department.toLowerCase());
};

/**
 * @description Create a new employee.
 * @param {{ name: string; position: string; department: string; email: string; phone: string; branchId: string; }} employee - The employee data.
 * @returns {Promise<Employee>}
 */
export const createEmployee = async (employee: {
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  branchId: string;
}): Promise<Employee> => {
  const newEmployee: Employee = { id: Date.now().toString(), ...employee };

  employees.push(newEmployee);
  return newEmployee;
};

/**
 * @description Update an existing employee.
 * @param {string} id - The ID of the employee to update.
 * @param {{ name: string; position: string; department: string; email: string; phone: string; branchId: string; }} employee - The updated employee data.
 * @returns {Promise<Employee>}
 * @throws {Error} If the employee with the given ID is not found.
 */
export const updateEmployee = async (
  id: string,
  employee: {
    name: string;
    position: string;
    department: string;
    email: string;
    phone: string;
    branchId: string;
  }
): Promise<Employee> => {
  const index: number = employees.findIndex((i) => i.id === id);
  if (index === -1) {
    throw new Error(`Employee with ID ${id} not found`);
  }

  employees[index] = { id, ...employee };

  return employees[index];
};

/**
 * @description Delete an employee.
 * @param {string} id - The ID of the employee to delete.
 * @returns {Promise<void>}
 * @throws {Error} If the employee with the given ID is not found.
 */
export const deleteEmployee = async (id: string): Promise<void> => {
  const index: number = employees.findIndex((i) => i.id === id);
  if (index === -1) {
    throw new Error(`Employee with ID ${id} not found`);
  }

  employees.splice(index, 1);
};
