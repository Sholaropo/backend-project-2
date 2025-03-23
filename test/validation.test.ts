import { Request, Response, NextFunction } from "express";
import { validate, validateRequest } from "../src/api/v1/middleware/validate";
import { branchSchema } from "../src/api/v1/validation/branchValidation";
import { employeeSchema } from "../src/api/v1/validation/employeeValidation";

interface Branch {
  id?: string;
  name: string;
  address: string;
  phone: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface Employee {
    id?: string;
    name: string;
    position: string;
    department: string;
    email: string;
    phone: string;
    branchId: string;
    createdAt?: Date;
    updatedAt?: Date;
}

describe("validate function for branches", () => {
  it("should not throw an error for valid branch data", () => {
    const data: Branch = {
      name: "Test name",
      address: "vancouver, canada",
      phone: "1234567890",
    };

    expect(() => validate(branchSchema, data)).not.toThrow();
  });

  it("should not throw an error for valid branch data with optional fields", () => {
    const data: Branch = {
      id: "550e8400-e29b-41d4-a716-446655440000",
      name: "Test name",
      address: "vancouver, canada",
      phone: "1234567890",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    expect(() => validate(branchSchema, data)).not.toThrow();
  });

  it("should throw an error for missing name", () => {
    const data: Partial<Branch> = {
      address: "vancouver, canada",
      phone: "1234567890",
    };

    expect(() => validate(branchSchema, data)).toThrow(
      "Validation error: Name is required"
    );
  });

  it("should throw an error for empty name", () => {
    const data: Branch = {
      name: "",
      address: "vancouver, canada",
      phone: "1234567890",
    };

    expect(() => validate(branchSchema, data)).toThrow(
      "Validation error: Name cannot be empty"
    );
  });

  it("should throw an error for missing address", () => {
    const data: Partial<Branch> = {
      name: "Test name",
      phone: "1234567890",
    };

    expect(() => validate(branchSchema, data)).toThrow(
      "Validation error: Address is required"
    );
  });

  it("should throw an error for empty address", () => {
    const data: Branch = {
      name: "Test name",
      address: "",
      phone: "1234567890",
    };

    expect(() => validate(branchSchema, data)).toThrow(
      "Validation error: Address cannot be empty"
    );
  });
});

describe("validateRequest middleware for branches", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("should call next for valid branch data", () => {
    req.body = {
      name: "Test name",
      address: "vancouver, canada",
      phone: "1234567890",
    };

    validateRequest(branchSchema)(req as Request, res as Response, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it("should return 400 for missing name", () => {
    req.body = {
      address: "vancouver, canada",
      phone: "1234567890",
    };

    validateRequest(branchSchema)(req as Request, res as Response, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Validation error: Name is required",
    });
  });

  it("should return 400 for empty name", () => {
    req.body = {
      name: "",
      address: "vancouver, canada",
      phone: "1234567890",
    };

    validateRequest(branchSchema)(req as Request, res as Response, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Validation error: Name cannot be empty",
    });
  });

  it("should return 400 for missing address", () => {
    req.body = {
      name: "Test name",
      phone: "1234567890",
    };

    validateRequest(branchSchema)(req as Request, res as Response, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Validation error: Address is required",
    });
  });

  it("should return 400 for empty address", () => {
    req.body = {
      name: "Test name",
      address: "",
      phone: "1234567890",
    };

    validateRequest(branchSchema)(req as Request, res as Response, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Validation error: Address cannot be empty",
    });
  });
});

describe("validate function for employees", () => {
  it("should not throw an error for valid employee data", () => {
    const data: Employee = {
      name: "John Doe",
      position: "Manager",
      department: "Sales",
      email: "john.doe@example.com",
      phone: "1234567890",
      branchId: "550e8400-e29b-41d4-a716-446655440000",
    };

    expect(() => validate(employeeSchema, data)).not.toThrow();
  });

  it("should not throw an error for valid employee data with optional fields", () => {
    const data: Employee = {
      id: "123e4567-e89b-12d3-a456-426614174000",
      name: "John Doe",
      position: "Manager",
      department: "Sales",
      email: "john.doe@example.com",
      phone: "1234567890",
      branchId: "550e8400-e29b-41d4-a716-446655440000",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    expect(() => validate(employeeSchema, data)).not.toThrow();
  });

  it("should throw an error for missing name", () => {
    const data: Partial<Employee> = {
      position: "Manager",
      department: "Sales",
      email: "john.doe@example.com",
      phone: "1234567890",
      branchId: "550e8400-e29b-41d4-a716-446655440000",
    };

    expect(() => validate(employeeSchema, data)).toThrow(
      "Validation error: Name is required"
    );
  });

  it("should throw an error for empty name", () => {
    const data: Employee = {
      name: "",
      position: "Manager",
      department: "Sales",
      email: "john.doe@example.com",
      phone: "1234567890",
      branchId: "550e8400-e29b-41d4-a716-446655440000",
    };

    expect(() => validate(employeeSchema, data)).toThrow(
      "Validation error: Name cannot be empty"
    );
  });

  it("should throw an error for missing position", () => {
    const data: Partial<Employee> = {
      name: "John Doe",
      department: "Sales",
      email: "john.doe@example.com",
      phone: "1234567890",
      branchId: "550e8400-e29b-41d4-a716-446655440000",
    };

    expect(() => validate(employeeSchema, data)).toThrow(
      "Validation error: Position is required"
    );
  });

  it("should throw an error for empty position", () => {
    const data: Employee = {
      name: "John Doe",
      position: "",
      department: "Sales",
      email: "john.doe@example.com",
      phone: "1234567890",
      branchId: "550e8400-e29b-41d4-a716-446655440000",
    };

    expect(() => validate(employeeSchema, data)).toThrow(
      "Validation error: Position cannot be empty"
    );
  });

  it("should throw an error for missing department", () => {
    const data: Partial<Employee> = {
      name: "John Doe",
      position: "Manager",
      email: "john.doe@example.com",
      phone: "1234567890",
      branchId: "550e8400-e29b-41d4-a716-446655440000",
    };

    expect(() => validate(employeeSchema, data)).toThrow(
      "Validation error: Department is required"
    );
  });

  it("should throw an error for empty department", () => {
    const data: Employee = {
      name: "John Doe",
      position: "Manager",
      department: "",
      email: "john.doe@example.com",
      phone: "1234567890",
      branchId: "550e8400-e29b-41d4-a716-446655440000",
    };

    expect(() => validate(employeeSchema, data)).toThrow(
      "Validation error: Department cannot be empty"
    );
  });

  it("should throw an error for missing email", () => {
    const data: Partial<Employee> = {
      name: "John Doe",
      position: "Manager",
      department: "Sales",
      phone: "1234567890",
      branchId: "550e8400-e29b-41d4-a716-446655440000",
    };

    expect(() => validate(employeeSchema, data)).toThrow(
      "Validation error: Email is required"
    );
  });

  it("should throw an error for empty email", () => {
    const data: Employee = {
      name: "John Doe",
      position: "Manager",
      department: "Sales",
      email: "",
      phone: "1234567890",
      branchId: "550e8400-e29b-41d4-a716-446655440000",
    };

    expect(() => validate(employeeSchema, data)).toThrow(
      "Validation error: Email cannot be empty"
    );
  });

  it("should throw an error for missing branchId", () => {
    const data: Partial<Employee> = {
      name: "John Doe",
      position: "Manager",
      department: "Sales",
      email: "john.doe@example.com",
      phone: "1234567890",
    };

    expect(() => validate(employeeSchema, data)).toThrow(
      "Validation error: Branch ID is required"
    );
  });

  it("should throw an error for empty branchId", () => {
    const data: Employee = {
      name: "John Doe",
      position: "Manager",
      department: "Sales",
      email: "john.doe@example.com",
      phone: "1234567890",
      branchId: "",
    };

    expect(() => validate(employeeSchema, data)).toThrow(
      "Validation error: Branch ID cannot be empty"
    );
  });
});

describe("validateRequest middleware for employees", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("should call next for valid employee data", () => {
    req.body = {
      name: "John Doe",
      position: "Manager",
      department: "Sales",
      email: "john.doe@example.com",
      phone: "1234567890",
      branchId: "550e8400-e29b-41d4-a716-446655440000",
    };

    validateRequest(employeeSchema)(req as Request, res as Response, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it("should return 400 for missing name", () => {
    req.body = {
      position: "Manager",
      department: "Sales",
      email: "john.doe@example.com",
      phone: "1234567890",
      branchId: "550e8400-e29b-41d4-a716-446655440000",
    };

    validateRequest(employeeSchema)(req as Request, res as Response, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Validation error: Name is required",
    });
  });

  it("should return 400 for empty name", () => {
    req.body = {
      name: "",
      position: "Manager",
      department: "Sales",
      email: "john.doe@example.com",
      phone: "1234567890",
      branchId: "550e8400-e29b-41d4-a716-446655440000",
    };

    validateRequest(employeeSchema)(req as Request, res as Response, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Validation error: Name cannot be empty",
    });
  });

  it("should return 400 for missing position", () => {
    req.body = {
      name: "John Doe",
      department: "Sales",
      email: "john.doe@example.com",
      phone: "1234567890",
      branchId: "550e8400-e29b-41d4-a716-446655440000",
    };

    validateRequest(employeeSchema)(req as Request, res as Response, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Validation error: Position is required",
    });
  });

  it("should return 400 for missing department", () => {
    req.body = {
      name: "John Doe",
      position: "Manager",
      email: "john.doe@example.com",
      phone: "1234567890",
      branchId: "550e8400-e29b-41d4-a716-446655440000",
    };

    validateRequest(employeeSchema)(req as Request, res as Response, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Validation error: Department is required",
    });
  });

  it("should return 400 for missing email", () => {
    req.body = {
      name: "John Doe",
      position: "Manager",
      department: "Sales",
      phone: "1234567890",
      branchId: "550e8400-e29b-41d4-a716-446655440000",
    };

    validateRequest(employeeSchema)(req as Request, res as Response, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Validation error: Email is required",
    });
  });

  it("should return 400 for missing branchId", () => {
    req.body = {
      name: "John Doe",
      position: "Manager",
      department: "Sales",
      email: "john.doe@example.com",
      phone: "1234567890",
    };

    validateRequest(employeeSchema)(req as Request, res as Response, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Validation error: Branch ID is required",
    });
  });
});