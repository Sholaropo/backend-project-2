import express, { Router } from "express";
import * as branchController from "../controllers/branchController";
import { validateRequest } from "../middleware/validate";
import { branchSchema, deleteBranchSchema } from "../validation/branchValidation";

const router: Router = express.Router();

/**
 * @openapi
 * /branches:
 *   get:
 *     summary: Retrieve a list of all branches
 *     description: Fetch all branches from the database.
 *     tags: [Branch]
 *     responses:
 *       200:
 *         description: A list of branches retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Branch'
 */
router.get("/", branchController.getAllBranches);

/**
 * @openapi
 * /branches/{id}:
 *   get:
 *     summary: Retrieve a branch by its ID
 *     description: Fetch a specific branch by its unique identifier.
 *     tags: [Branch]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the branch
 *         example: "branch_123abc"
 *     responses:
 *       200:
 *         description: The branch details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Branch'
 *       404:
 *         description: Branch not found
 */
router.get("/:id", branchController.getBranchById);

/**
 * @openapi
 * /branches:
 *   post:
 *     summary: Create a new branch
 *     description: Adds a new branch to the system.
 *     tags: [Branch]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Branch'
 *     responses:
 *       201:
 *         description: Branch created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Branch'
 *       400:
 *         description: Invalid input
 */
router.post("/", validateRequest(branchSchema), branchController.createBranch);

/**
 * @openapi
 * /branches/{id}:
 *   put:
 *     summary: Update an existing branch
 *     description: Updates the details of a specific branch by its ID.
 *     tags: [Branch]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the branch
 *         example: "branch_123abc"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Branch'
 *     responses:
 *       200:
 *         description: Branch updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Branch'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Branch not found
 */
router.put("/:id", validateRequest(branchSchema), branchController.updateBranch);

/**
 * @openapi
 * /branches/{id}:
 *   delete:
 *     summary: Delete a branch
 *     description: Removes a branch from the system by its ID.
 *     tags: [Branch]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the branch
 *         example: "branch_123abc"
 *     responses:
 *       200:
 *         description: Branch deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Branch Deleted"
 *       404:
 *         description: Branch not found
 */
router.delete("/:id", validateRequest(deleteBranchSchema), branchController.deleteBranch);

export default router;