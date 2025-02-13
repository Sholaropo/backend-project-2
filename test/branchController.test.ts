import { Request, Response, NextFunction } from "express";
import * as branchController from "../src/api/v1/controllers/branchController";
import * as branchService from "../src/api/v1/services/branchService";

jest.mock("../src/api/v1/services/branchService");

describe("Branch Controller", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        jest.clearAllMocks();
        mockReq = { params: {}, body: {} };
        mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        mockNext = jest.fn();
    });

    describe("getAllBranches", () => {
        it("should handle successful operation", async () => {
            const mockBranches = [
                { id: "1", name: "Test Branch", address: "Test Address", phone: "1234567890" }
            ];

            (branchService.getAllBranches as jest.Mock).mockResolvedValue(mockBranches);

            await branchController.getAllBranches(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Branches Retrieved",
                data: mockBranches,
            });
        });

        it("should handle errors", async () => {
            const error = new Error("Test error");
            (branchService.getAllBranches as jest.Mock).mockRejectedValue(error);

            await branchController.getAllBranches(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });

    describe("getBranchById", () => {
        it("should handle successful operation", async () => {
            const mockBranch = { 
                id: "1", 
                name: "Test Branch", 
                address: "Test Address", 
                phone: "1234567890" 
            };
            mockReq.params = { id: "1" };

            (branchService.getBranchById as jest.Mock).mockResolvedValue(mockBranch);

            await branchController.getBranchById(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Branch Retrieved",
                data: mockBranch,
            });
        });
    });
});