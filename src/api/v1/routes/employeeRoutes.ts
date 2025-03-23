import express, { Router } from "express";
import * as employeeController from "../controllers/employeeController";
import { validateRequest } from "../middleware/validate";
import { employeeSchema, deleteEmployeeSchema } from "../validation/employeeValidation";

const router: Router = express.Router();

/**
 * @openapi
 * /employees:
 *   get:
 *     summary: Retrieve a list of employees
 *     description: Fetches all employees from the system.
 *     tags: [Employee]
 *     responses:
 *       200:
 *         description: A list of employees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employee'
 */
router.get("/", employeeController.getAllEmployees);

/**
 * @openapi
 * /employees/{id}:
 *   get:
 *     summary: Get an employee by ID
 *     description: Fetches a single employee by their unique identifier.
 *     tags: [Employee]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the employee
 *         example: "employee_123abc"
 *     responses:
 *       200:
 *         description: Employee retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       404:
 *         description: Employee not found
 */
router.get("/:id", employeeController.getEmployeeById);

/**
 * @openapi
 * /employees/branch/{branchId}:
 *   get:
 *     summary: Get employees by branch
 *     description: Retrieves all employees that belong to a specific branch.
 *     tags: [Employee]
 *     parameters:
 *       - in: path
 *         name: branchId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the branch
 *         example: "branch_123abc"
 *     responses:
 *       200:
 *         description: Employees retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employee'
 *       404:
 *         description: No employees found for the given branch
 */
router.get("/branch/:branchId", employeeController.getEmployeesByBranch);

/**
 * @openapi
 * /employees/department/{department}:
 *   get:
 *     summary: Get employees by department
 *     description: Retrieves all employees belonging to a specific department.
 *     tags: [Employee]
 *     parameters:
 *       - in: path
 *         name: department
 *         required: true
 *         schema:
 *           type: string
 *         description: The department name to filter employees
 *         example: "Engineering"
 *     responses:
 *       200:
 *         description: Employees retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employee'
 *       404:
 *         description: No employees found in the given department
 */
router.get("/department/:department", employeeController.getEmployeesByDepartment);

/**
 * @openapi
 * /employees:
 *   post:
 *     summary: Create a new employee
 *     description: Adds a new employee to the system.
 *     tags: [Employee]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       201:
 *         description: Employee created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       400:
 *         description: Invalid input data
 */
router.post("/", validateRequest(employeeSchema), employeeController.createEmployee);

/**
 * @openapi
 * /employees/{id}:
 *   put:
 *     summary: Update an existing employee
 *     description: Modifies details of an existing employee.
 *     tags: [Employee]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the employee to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Employee not found
 */
router.put("/:id", validateRequest(employeeSchema), employeeController.updateEmployee);

/**
 * @openapi
 * /employees/{id}:
 *   delete:
 *     summary: Delete an employee
 *     description: Removes an employee from the system by their ID.
 *     tags: [Employee]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the employee to delete
 *     responses:
 *       200:
 *         description: Employee deleted successfully
 *       400:
 *         description: Invalid employee ID
 *       404:
 *         description: Employee not found
 */
router.delete("/:id", validateRequest(deleteEmployeeSchema), employeeController.deleteEmployee);

export default router;