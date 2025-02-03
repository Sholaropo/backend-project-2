import mongoose from "mongoose";
import supertest, { Agent } from "supertest";
import app from "../src/app";

const api: Agent = supertest(app);

mongoose.set("bufferTimeoutMS", 30000);

interface Branch {
  name: string;
  address: string;
  phone: string;
}

interface BranchResponse extends Branch {
  id: string;
}

interface Employee {
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  branch: string;
}

interface ResponseEmployee extends Omit<Employee, "branch"> {
  id: string;
  branch: string | BranchResponse;
}

describe("employee api", () => {
  async function createTestBranch(): Promise<string> {
    const branch: Branch = {
      name: "Test Branch",
      address: "Test Address",
      phone: "604-555-0000",
    };

    const response: supertest.Response = await api
      .post("/api/v1/branches")
      .send(branch)
      .expect(201);

    return response.body.id;
  }

  test("a new employee can be created", async () => {
    const branchId: string = await createTestBranch();

    const newEmployee: Employee = {
      name: "victor a",
      position: "Developer",
      department: "Engineering",
      email: "victor@example.com",
      phone: "604-456-0022",
      branch: branchId,
    };

    const response: supertest.Response = await api
      .post("/api/v1/employees")
      .send(newEmployee)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toBeDefined();
    expect(response.body.name).toBe(newEmployee.name);
    expect(response.body.position).toBe(newEmployee.position);
    expect(response.body.department).toBe(newEmployee.department);
    expect(response.body.email).toBe(newEmployee.email);
    expect(response.body.phone).toBe(newEmployee.phone);
    expect(response.body.branch).toBe(branchId);
    expect(response.body.id).toBeDefined();
    expect(typeof response.body.id).toBe("string");
  });

  test("GET /api/v1/employees returns all employees as an array", async () => {
    const response: supertest.Response = await api
      .get("/api/v1/employees")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(Array.isArray(response.body)).toBe(true);

    response.body.forEach((employee: ResponseEmployee) => {
      expect(employee).toHaveProperty("id");
      expect(employee).toHaveProperty("name");
      expect(employee).toHaveProperty("position");
      expect(employee).toHaveProperty("department");
      expect(employee).toHaveProperty("email");
      expect(employee).toHaveProperty("phone");
      expect(employee).toHaveProperty("branch");
    });
  });

  test("GET /api/v1/employees/:id returns the correct employee", async () => {
    const branchId: string = await createTestBranch();

    const newEmployee: Employee = {
      name: "test employee",
      position: "Manager",
      department: "Sales",
      email: "test@example.com",
      phone: "604-555-0000",
      branch: branchId,
    };

    const createResponse: supertest.Response = await api
      .post("/api/v1/employees")
      .send(newEmployee)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const createdEmployeeId: string = createResponse.body.id;

    const getResponse: supertest.Response = await api
      .get(`/api/v1/employees/${createdEmployeeId}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(getResponse.body).toBeDefined();
    expect(getResponse.body.id).toBe(createdEmployeeId);
    expect(getResponse.body.name).toBe(newEmployee.name);
    expect(getResponse.body.position).toBe(newEmployee.position);
    expect(getResponse.body.department).toBe(newEmployee.department);
    expect(getResponse.body.email).toBe(newEmployee.email);
    expect(getResponse.body.phone).toBe(newEmployee.phone);
    if (typeof getResponse.body.branch === "object") {
      expect(getResponse.body.branch.id).toBe(branchId);
    } else {
      expect(getResponse.body.branch).toBe(branchId);
    }
  });

  test("PUT /api/v1/employees/:id updates employee data correctly", async () => {
    const branchId: string = await createTestBranch();
    const newBranchId: string = await createTestBranch();

    const initialEmployee: Employee = {
      name: "initial name",
      position: "initial position",
      department: "initial department",
      email: "initial@example.com",
      phone: "604-555-0000",
      branch: branchId,
    };

    const createResponse: supertest.Response = await api
      .post("/api/v1/employees")
      .send(initialEmployee)
      .expect(201);

    const employeeId: string = createResponse.body.id;

    const updatedData: Employee = {
      name: "updated name",
      position: "updated position",
      department: "updated department",
      email: "updated@example.com",
      phone: "604-555-9999",
      branch: newBranchId,
    };

    const updateResponse: supertest.Response = await api
      .put(`/api/v1/employees/${employeeId}`)
      .send(updatedData)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(updateResponse.body).toBeDefined();
    expect(updateResponse.body.id).toBe(employeeId);
    expect(updateResponse.body.name).toBe(updatedData.name);
    expect(updateResponse.body.position).toBe(updatedData.position);
    expect(updateResponse.body.department).toBe(updatedData.department);
    expect(updateResponse.body.email).toBe(updatedData.email);
    expect(updateResponse.body.phone).toBe(updatedData.phone);
    if (typeof updateResponse.body.branch === "object") {
      expect(updateResponse.body.branch.id).toBe(newBranchId);
    } else {
      expect(updateResponse.body.branch).toBe(newBranchId);
    }

    const getResponse: supertest.Response = await api
      .get(`/api/v1/employees/${employeeId}`)
      .expect(200);

    expect(getResponse.body.name).toBe(updatedData.name);
    expect(getResponse.body.position).toBe(updatedData.position);
    expect(getResponse.body.department).toBe(updatedData.department);
    expect(getResponse.body.email).toBe(updatedData.email);
    expect(getResponse.body.phone).toBe(updatedData.phone);
    if (typeof getResponse.body.branch === "object") {
      expect(getResponse.body.branch.id).toBe(newBranchId);
    } else {
      expect(getResponse.body.branch).toBe(newBranchId);
    }
  });

  test("DELETE /api/v1/employees/:id successfully deletes an employee", async () => {
    const branchId: string = await createTestBranch();

    const newEmployee: Employee = {
      name: "employee to delete",
      position: "position to delete",
      department: "department to delete",
      email: "delete@example.com",
      phone: "604-555-1111",
      branch: branchId,
    };

    const createResponse: supertest.Response = await api
      .post("/api/v1/employees")
      .send(newEmployee)
      .expect(201);

    const employeeId: string = createResponse.body.id;

    await api.delete(`/api/v1/employees/${employeeId}`).expect(204);

    await api.get(`/api/v1/employees/${employeeId}`).expect(404);
  });

  test("GET /api/v1/employees/branch/:branchId returns all employees for the branch", async () => {
    const branchId: string = await createTestBranch();
    const otherBranchId: string = await createTestBranch();

    const branchEmployees: Employee[] = [
      {
        name: "Employee 1",
        position: "Developer",
        department: "Engineering",
        email: "emp1@example.com",
        phone: "604-555-0001",
        branch: branchId,
      },
      {
        name: "Employee 2",
        position: "Designer",
        department: "Design",
        email: "emp2@example.com",
        phone: "604-555-0002",
        branch: branchId,
      },
    ];

    const otherBranchEmployee: Employee = {
      name: "Other Employee",
      position: "Manager",
      department: "Sales",
      email: "other@example.com",
      phone: "604-555-0003",
      branch: otherBranchId,
    };

    await Promise.all([
      ...branchEmployees.map((employee) =>
        api.post("/api/v1/employees").send(employee).expect(201)
      ),
      api.post("/api/v1/employees").send(otherBranchEmployee).expect(201),
    ]);

    const response: supertest.Response = await api
      .get(`/api/v1/employees/branch/${branchId}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(branchEmployees.length);

    response.body.forEach((employee: ResponseEmployee) => {
      expect(employee).toHaveProperty("id");
      expect(employee).toHaveProperty("name");
      expect(employee).toHaveProperty("position");
      expect(employee).toHaveProperty("department");
      expect(employee).toHaveProperty("email");
      expect(employee).toHaveProperty("phone");
      expect(employee).toHaveProperty("branch");

      if (typeof employee.branch === "object") {
        expect(employee.branch.id).toBe(branchId);
      } else {
        expect(employee.branch).toBe(branchId);
      }

      expect(
        branchEmployees.some(
          (testEmployee) =>
            testEmployee.name === employee.name &&
            testEmployee.position === employee.position &&
            testEmployee.department === employee.department &&
            testEmployee.email === employee.email &&
            testEmployee.phone === employee.phone
        )
      ).toBe(true);
    });
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
