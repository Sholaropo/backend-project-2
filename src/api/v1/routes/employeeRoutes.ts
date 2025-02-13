import express, { Router } from "express";
import * as employeeController from "../controllers/employeeController";

const router: Router = express.Router();

/**
 * @route GET /
 * @description Get all employees.
 */
router.get("/", employeeController.getAllEmployees);

/**
 * @route GET /:id
 * @description Get a single employee by ID.
 */
router.get("/:id", employeeController.getEmployeeById);

/**
 * @route GET /branch/:branchId
 * @description Get all employees in a specific branch.
 */
router.get("/branch/:branchId", employeeController.getEmployeesByBranch);

/**
 * @route GET /department/:department
 * @description Get all employees in a specific department.
 */
router.get("/department/:department", employeeController.getEmployeesByDepartment);

/**
 * @route POST /
 * @description Create a new employee.
 */
router.post("/", employeeController.createEmployee);

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
router.put("/:id", employeeController.updateEmployee);

/**
 * @route DELETE /:id
 * @description Delete an employee.
 */
router.delete("/:id", employeeController.deleteEmployee);

export default router;