import request from "supertest";
import app from "../src/app";
import {
    getAllBranches,
    getBranchById,
    createBranch,
    updateBranch,
    deleteBranch,
} from "../src/api/v1/controllers/branchController";

jest.mock("../src/api/v1/controllers/branchController", () => ({
    getAllBranches: jest.fn((req, res) => res.status(200).send()),
    getBranchById: jest.fn((req, res) => res.status(200).send()),
    createBranch: jest.fn((req, res) => res.status(201).send()),
    updateBranch: jest.fn((req, res) => res.status(200).send()),
    deleteBranch: jest.fn((req, res) => res.status(200).send()),
}));

describe("Branch Routes", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("GET /api/v1/branches", () => {
        it("should call getAllBranches controller", async () => {
            await request(app).get("/api/v1/branches");
            expect(getAllBranches).toHaveBeenCalled();
        });
    });

    describe("GET /api/v1/branches/:id", () => {
        it("should call getBranchById controller", async () => {
            const mockId = "1";
            await request(app).get(`/api/v1/branches/${mockId}`);
            expect(getBranchById).toHaveBeenCalled();
        });
    });

    describe("POST /api/v1/branches", () => {
        it("should call createBranch controller", async () => {
            const mockBranch = {
                name: "Test Branch",
                address: "Test Address",
                phone: "1234567890"
            };

            await request(app).post("/api/v1/branches").send(mockBranch);
            expect(createBranch).toHaveBeenCalled();
        });
    });

    describe("PUT /api/v1/branches/:id", () => {
        it("should call updateBranch controller", async () => {
            const mockBranch = {
                name: "Updated Branch",
                address: "Updated Address",
                phone: "0987654321"
            };

            const mockId = "1";

            await request(app).put(`/api/v1/branches/${mockId}`).send(mockBranch);
            expect(updateBranch).toHaveBeenCalled();
        });
    });

    describe("DELETE /api/v1/branches/:id", () => {
        it("should call deleteBranch controller", async () => {
            const mockId = "1";
            await request(app).delete(`/api/v1/branches/${mockId}`);
            expect(deleteBranch).toHaveBeenCalled();
        });
    });
});