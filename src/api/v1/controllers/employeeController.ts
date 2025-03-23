import { Request, Response, NextFunction } from "express";
import * as employeeService from "../services/employeeService";
import  { Employee } from "../models/employeeModel";
import { successResponse } from "../models/responseModel";
import { HTTP_STATUS } from "../../../constants/httpConstants";

/**
 * @description Get all employees.
 * @route GET /
 * @returns {Promise<void>}
 */
export const getAllEmployees = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const employees: Employee[] = await employeeService.getAllEmployees();

        res.status(HTTP_STATUS.OK).json(successResponse(employees, "Employees Retrieved"));
    } catch (error) {
        next(error);
    }
};

/**
 * @description Get a single employee by ID.
 * @route GET /:id
 * @returns {Promise<void>}
 */
export const getEmployeeById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const employee: Employee = await employeeService.getEmployeeById(req.params.id);
        res.status(HTTP_STATUS.OK).json(successResponse(employee, "Employee Retrieved"));
    } catch (error) {
        next(error);
    }
};

/**
 * @description Get employees by branch ID.
 * @route GET /branch/:branchId
 * @returns {Promise<void>}
 */
export const getEmployeesByBranch = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const employees: Employee[] = await employeeService.getEmployeesByBranch(
            req.params.branchId
        );

        res.status(HTTP_STATUS.OK).json(successResponse(employees, "Employees Retrieved"));
    } catch (error) {
        next(error);
    }
};

/**
 * @description Get employees by department.
 * @route GET /department/:department
 * @returns {Promise<void>}
 */
export const getEmployeesByDepartment = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const employees: Employee[] = await employeeService.getEmployeesByDepartment(
            req.params.department
        );

        res.status(HTTP_STATUS.OK).json(successResponse(employees, "Employees Retrieved"));
    } catch (error) {
        next(error);
    }
};


/**
 * @description Create a new employee.
 * @route POST /
 * @returns {Promise<void>}
 */
export const createEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const newEmployee: Employee = await employeeService.createEmployee(req.body);

        res.status(HTTP_STATUS.CREATED).json(successResponse(newEmployee, "Employee Created"));
    } catch (error) {
        next(error);
    }
};

/**
 * @description Update an existing employee.
 * @route PUT /:id
 * @returns {Promise<void>}
 */
export const updateEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const updatedEmployee: Employee = await employeeService.updateEmployee(
            req.params.id,
            req.body
        );

        res.status(HTTP_STATUS.OK).json(successResponse(updatedEmployee, "Employee Updated"));
    } catch (error) {
        next(error);
    }
};

/**
 * @description Delete an employee.
 * @route DELETE /:id
 * @returns {Promise<void>}
 */
export const deleteEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        await employeeService.deleteEmployee(req.params.id);

        res.status(HTTP_STATUS.OK).json(successResponse("Employee Deleted"));
    } catch (error) {
        next(error);
    }
};