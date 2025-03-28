import express, { Router } from "express";
import * as employeeController from "../controllers/employeeController";
import { validateRequest } from "../middleware/validate";
import { employeeSchema, deleteEmployeeSchema } from "../validation/employeeValidation";

const router: Router = express.Router();

/**
 * @route GET /
 * @description Get all employees.
 *
 * @openapi
 * /api/v1/employees:
 *   get:
 *     summary: Get all employees
 *     tags: [Employees]
 *     responses:
 *       200:
 *         description: List of all employees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   position:
 *                     type: string
 *                   department:
 *                     type: string
 *                   email:
 *                     type: string
 *                   phone:
 *                     type: string
 *                   branchId:
 *                     type: string
 */
router.get("/", employeeController.getAllEmployees);

/**
 * @route GET /:id
 * @description Get a single employee by ID.
 *
 * @openapi
 * /api/v1/employees/{id}:
 *   get:
 *     summary: Get a single employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the employee to retrieve
 *     responses:
 *       200:
 *         description: The requested employee
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 position:
 *                   type: string
 *                 department:
 *                   type: string
 *                 email:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 branchId:
 *                   type: string
 *       404:
 *         description: Employee not found
 */
router.get("/:id", employeeController.getEmployeeById);

/**
 * @route GET /branch/:branchId
 * @description Get all employees in a specific branch.
 *
 * @openapi
 * /api/v1/employees/branch/{branchId}:
 *   get:
 *     summary: Get all employees in a specific branch
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: branchId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the branch to get employees from
 *     responses:
 *       200:
 *         description: List of employees in the specified branch
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   position:
 *                     type: string
 *                   department:
 *                     type: string
 *                   email:
 *                     type: string
 *                   phone:
 *                     type: string
 *                   branchId:
 *                     type: string
 *       404:
 *         description: Branch not found
 */
router.get("/branch/:branchId", employeeController.getEmployeesByBranch);

/**
 * @route GET /department/:department
 * @description Get all employees in a specific department.
 *
 * @openapi
 * /api/v1/employees/department/{department}:
 *   get:
 *     summary: Get all employees in a specific department
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: department
 *         schema:
 *           type: string
 *         required: true
 *         description: Name of the department to get employees from
 *     responses:
 *       200:
 *         description: List of employees in the specified department
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   position:
 *                     type: string
 *                   department:
 *                     type: string
 *                   email:
 *                     type: string
 *                   phone:
 *                     type: string
 *                   branchId:
 *                     type: string
 */
router.get("/department/:department", employeeController.getEmployeesByDepartment);

/**
 * @route POST /
 * @description Create a new employee.
 *
 * @openapi
 * /api/v1/employees:
 *   post:
 *     summary: Create a new employee
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - position
 *               - department
 *               - email
 *               - branchId
 *             properties:
 *               name:
 *                 type: string
 *               position:
 *                 type: string
 *               department:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               branchId:
 *                 type: string
 *     responses:
 *       201:
 *         description: The created employee
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 position:
 *                   type: string
 *                 department:
 *                   type: string
 *                 email:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 branchId:
 *                   type: string
 *       400:
 *         description: Invalid input data
 */
router.post("/", validateRequest(employeeSchema), employeeController.createEmployee);

/**
 * @route PUT /:id
 * @description Update an existing employee.
 *
 * @openapi
 * /api/v1/employees/{id}:
 *   put:
 *     summary: Update an existing employee
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the employee to update
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               position:
 *                 type: string
 *               department:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               branchId:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated employee
 */
router.put("/:id", validateRequest(employeeSchema), employeeController.updateEmployee);

/**
 * @route DELETE /:id
 * @description Delete an employee.
 *
 * @openapi
 * /api/v1/employees/{id}:
 *   delete:
 *     summary: Delete an employee
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the employee to delete
 *     responses:
 *       200:
 *         description: Employee successfully deleted
 *       404:
 *         description: Employee not found
 */
router.delete("/:id", validateRequest(deleteEmployeeSchema), employeeController.deleteEmployee);

export default router;