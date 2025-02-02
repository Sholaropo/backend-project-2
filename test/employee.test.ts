import mongoose from "mongoose";
import supertest from "supertest";
import app from "../src/app";

const api = supertest(app);

mongoose.set("bufferTimeoutMS", 30000);

describe("employee api", () => {
  async function createTestBranch() {
    const branch = {
      name: "Test Branch",
      address: "Test Address",
      phone: "604-555-0000"
    };
    
    const response = await api
      .post("/api/v1/branches")
      .send(branch)
      .expect(201);
      
    return response.body.id;
  }

  test("a new employee can be created", async () => {
    const branchId = await createTestBranch();

    const newEmployee = {
      name: "victor a",
      position: "Developer",
      department: "Engineering",
      email: "victor@example.com",
      phone: "604-456-0022",
      branch: branchId
    };

    const response = await api
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
    const response = await api
      .get("/api/v1/employees")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(Array.isArray(response.body)).toBe(true);

    response.body.forEach((employee: any) => {
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
    const branchId = await createTestBranch();

    const newEmployee = {
      name: "test employee",
      position: "Manager",
      department: "Sales",
      email: "test@example.com",
      phone: "604-555-0000",
      branch: branchId
    };

    const createResponse = await api
      .post("/api/v1/employees")
      .send(newEmployee)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const createdEmployeeId = createResponse.body.id;

    const getResponse = await api
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
    if (typeof getResponse.body.branch === 'object') {
      expect(getResponse.body.branch.id).toBe(branchId);
    } else {
      expect(getResponse.body.branch).toBe(branchId);
    }
  });

test("PUT /api/v1/employees/:id updates employee data correctly", async () => {
    const branchId = await createTestBranch();
    const newBranchId = await createTestBranch();

    const initialEmployee = {
      name: "initial name",
      position: "initial position",
      department: "initial department",
      email: "initial@example.com",
      phone: "604-555-0000",
      branch: branchId
    };

    const createResponse = await api
      .post("/api/v1/employees")
      .send(initialEmployee)
      .expect(201);

    const employeeId = createResponse.body.id;

    const updatedData = {
      name: "updated name",
      position: "updated position",
      department: "updated department",
      email: "updated@example.com",
      phone: "604-555-9999",
      branch: newBranchId
    };

    const updateResponse = await api
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
    if (typeof updateResponse.body.branch === 'object') {
      expect(updateResponse.body.branch.id).toBe(newBranchId);
    } else {
      expect(updateResponse.body.branch).toBe(newBranchId);
    }

    const getResponse = await api
      .get(`/api/v1/employees/${employeeId}`)
      .expect(200);

    expect(getResponse.body.name).toBe(updatedData.name);
    expect(getResponse.body.position).toBe(updatedData.position);
    expect(getResponse.body.department).toBe(updatedData.department);
    expect(getResponse.body.email).toBe(updatedData.email);
    expect(getResponse.body.phone).toBe(updatedData.phone);
    if (typeof getResponse.body.branch === 'object') {
      expect(getResponse.body.branch.id).toBe(newBranchId);
    } else {
      expect(getResponse.body.branch).toBe(newBranchId);
    }
  });

  test("DELETE /api/v1/employees/:id successfully deletes an employee", async () => {
    const branchId = await createTestBranch();

    const newEmployee = {
      name: "employee to delete",
      position: "position to delete",
      department: "department to delete",
      email: "delete@example.com",
      phone: "604-555-1111",
      branch: branchId
    };

    const createResponse = await api
      .post("/api/v1/employees")
      .send(newEmployee)
      .expect(201);

    const employeeId = createResponse.body.id;

    await api
      .delete(`/api/v1/employees/${employeeId}`)
      .expect(204);

    await api
      .get(`/api/v1/employees/${employeeId}`)
      .expect(404);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});