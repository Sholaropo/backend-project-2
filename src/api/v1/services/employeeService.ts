import { Employee } from "../models/employeeModel";
import {
  getDocuments,
  createDocument,
  updateDocument,
  deleteDocument,
  getDocumentById,
  queryDocumentsByField,
} from "../repositories/firestoreRepository";

const COLLECTION = "employees";

/**
 * @description Get all employees.
 * @returns {Promise<Employee[]>}
 */
export const getAllEmployees = async (): Promise<Employee[]> => {
  const snapshot: FirebaseFirestore.QuerySnapshot = await getDocuments(
    COLLECTION
  );

  return snapshot.docs.map((doc) => {
    const data: FirebaseFirestore.DocumentData = doc.data();
    return { id: doc.id, ...data } as Employee;
  });
};

/**
 * @description Get a single employee by ID.
 * @param {string} id - The ID of the employee to retrieve.
 * @returns {Promise<Employee>}
 * @throws {Error} If the employee with the given ID is not found.
 */
export const getEmployeeById = async (id: string): Promise<Employee> => {
  const doc: FirebaseFirestore.DocumentSnapshot = await getDocumentById(
    COLLECTION,
    id
  );
  if (!doc.exists) {
    throw new Error(`Employee with ID ${id} not found`);
  }
  const data: FirebaseFirestore.DocumentData | undefined = doc.data();
  return { id: doc.id, ...data } as Employee;
};

/**
 * @description Get employees by branch ID.
 * @param {string} branchId - The ID of the branch.
 * @returns {Promise<Employee[]>}
 */
export const getEmployeesByBranch = async (
  branchId: string
): Promise<Employee[]> => {
  const snapshot: FirebaseFirestore.QuerySnapshot = await queryDocumentsByField(
    COLLECTION,
    "branchId",
    branchId
  );

  return snapshot.docs.map((doc) => {
    const data: FirebaseFirestore.DocumentData = doc.data();
    return { id: doc.id, ...data } as Employee;
  });
};

/**
 * @description Get employees by department.
 * @param {string} department - The department name.
 * @returns {Promise<Employee[]>}
 */
export const getEmployeesByDepartment = async (
  department: string
): Promise<Employee[]> => {
  const snapshot: FirebaseFirestore.QuerySnapshot = await queryDocumentsByField(
    COLLECTION,
    "department",
    department
  );

  return snapshot.docs.map((doc) => {
    const data: FirebaseFirestore.DocumentData = doc.data();
    return { id: doc.id, ...data } as Employee;
  });
};

/**
 * @description Create a new employee.
 * @param {Partial<Employee>} employee - The employee data.
 * @returns {Promise<Employee>}
 */
export const createEmployee = async (
  employee: Partial<Employee>
): Promise<Employee> => {
  const id: string = await createDocument(COLLECTION, employee);
  return { id, ...employee } as Employee;
};

/**
 * @description Update an existing employee.
 * @param {string} id - The ID of the employee to update.
 * @param {Partial<Employee>} employee - The updated employee data.
 * @returns {Promise<Employee>}
 * @throws {Error} If the employee with the given ID is not found.
 */
export const updateEmployee = async (
  id: string,
  employee: Partial<Employee>
): Promise<Employee> => {
  await updateDocument(COLLECTION, id, employee);
  return { id, ...employee } as Employee;
};

/**
 * @description Delete an employee.
 * @param {string} id - The ID of the employee to delete.
 * @returns {Promise<void>}
 * @throws {Error} If the employee with the given ID is not found.
 */
export const deleteEmployee = async (id: string): Promise<void> => {
  await deleteDocument(COLLECTION, id);
};
