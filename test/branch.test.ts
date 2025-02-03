import mongoose from "mongoose";
import supertest, { Response, Agent } from "supertest";
import app from "../src/app";

interface IBranchResponse {
  id: string;
  name: string;
  address: string;
  phone: string;
}

interface IBranchData {
  name: string;
  address: string;
  phone: string;
}

const api: Agent = supertest(app);

mongoose.set("bufferTimeoutMS", 30000);

describe("branch api", () => {
  test("a new branch can be created", async () => {
    const newBranch: IBranchData = {
      name: "victor a",
      address: "Ontario, Canada",
      phone: "604-456-0022",
    };

    const response: Response = await api
      .post("/api/v1/branches")
      .send(newBranch)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toBeDefined();
    expect(response.body.name).toBe(newBranch.name);
    expect(response.body.address).toBe(newBranch.address);
    expect(response.body.phone).toBe(newBranch.phone);

    expect(response.body.id).toBeDefined();
    expect(typeof response.body.id).toBe("string");
  });

  test("GET /api/v1/branches returns all branches as an array", async () => {
    const response: Response = await api
      .get("/api/v1/branches")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(Array.isArray(response.body)).toBe(true);

    response.body.forEach((branch: IBranchResponse) => {
      expect(branch).toHaveProperty("id");
      expect(branch).toHaveProperty("name");
      expect(branch).toHaveProperty("address");
      expect(branch).toHaveProperty("phone");
    });
  });

  test("GET /api/v1/branches/:id returns the correct branch", async () => {
    const newBranch: IBranchData = {
      name: "test branch",
      address: "123 Test St",
      phone: "604-555-0000",
    };

    const createResponse: Response = await api
      .post("/api/v1/branches")
      .send(newBranch)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const createdBranchId: string = createResponse.body.id;

    const getResponse: Response = await api
      .get(`/api/v1/branches/${createdBranchId}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(getResponse.body).toBeDefined();
    expect(getResponse.body.id).toBe(createdBranchId);
    expect(getResponse.body.name).toBe(newBranch.name);
    expect(getResponse.body.address).toBe(newBranch.address);
    expect(getResponse.body.phone).toBe(newBranch.phone);
  });

  test("PUT /api/v1/branches/:id updates branch data correctly", async () => {
    const initialBranch: IBranchData = {
      name: "initial name",
      address: "initial address",
      phone: "604-555-0000",
    };

    const createResponse: Response = await api
      .post("/api/v1/branches")
      .send(initialBranch)
      .expect(201);

    const branchId: string = createResponse.body.id;

    const updatedData: IBranchData = {
      name: "updated name",
      address: "updated address",
      phone: "604-555-9999",
    };

    const updateResponse: Response = await api
      .put(`/api/v1/branches/${branchId}`)
      .send(updatedData)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(updateResponse.body).toBeDefined();
    expect(updateResponse.body.id).toBe(branchId);
    expect(updateResponse.body.name).toBe(updatedData.name);
    expect(updateResponse.body.address).toBe(updatedData.address);
    expect(updateResponse.body.phone).toBe(updatedData.phone);

    const getResponse: Response = await api
      .get(`/api/v1/branches/${branchId}`)
      .expect(200);

    expect(getResponse.body.name).toBe(updatedData.name);
    expect(getResponse.body.address).toBe(updatedData.address);
    expect(getResponse.body.phone).toBe(updatedData.phone);
  });

  test("DELETE /api/v1/branches/:id successfully deletes a branch", async () => {
    const newBranch: IBranchData = {
      name: "branch to delete",
      address: "delete address",
      phone: "604-555-1111",
    };

    const createResponse: Response = await api
      .post("/api/v1/branches")
      .send(newBranch)
      .expect(201);

    const branchId: string = createResponse.body.id;

    await api.delete(`/api/v1/branches/${branchId}`).expect(204);

    await api.get(`/api/v1/branches/${branchId}`).expect(404);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
