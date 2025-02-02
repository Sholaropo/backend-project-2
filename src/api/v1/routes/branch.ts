import { branchesController } from '../controllers/branch'
import express from 'express'
const router = express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Branch:
 *       type: object
 *       required:
 *         - name
 *         - address
 *         - phone
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the branch
 *         name:
 *           type: string
 *           description: The name of the branch
 *         address:
 *           type: string
 *           description: The physical address of the branch
 *         phone:
 *           type: string
 *           description: The contact phone number of the branch
 *       example:
 *         name: Downtown Branch
 *         address: 123 Main St, City, Country
 *         phone: +1-234-567-8900
 */

/**
 * @swagger
 * /api/v1/branches:
 *   post:
 *     summary: Create a new branch
 *     tags: [Branches]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - address
 *               - phone
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
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
router.post('/', branchesController.create)

/**
 * @swagger
 * /api/v1/branches:
 *   get:
 *     summary: Retrieve all branches
 *     tags: [Branches]
 *     responses:
 *       200:
 *         description: List of all branches
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Branch'
 */
router.get('/', branchesController.readAll)

/**
 * @swagger
 * /api/v1/branches/{id}:
 *   get:
 *     summary: Get a branch by id
 *     tags: [Branches]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The branch id
 *     responses:
 *       200:
 *         description: Branch details by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Branch'
 *       404:
 *         description: Branch not found
 */
router.get('/:id', branchesController.readSingle)

/**
 * @swagger
 * /api/v1/branches/{id}:
 *   put:
 *     summary: Update a branch by id
 *     tags: [Branches]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The branch id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Branch updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Branch'
 *       404:
 *         description: Branch not found
 */
router.put('/:id', branchesController.update)

/**
 * @swagger
 * /api/v1/branches/{id}:
 *   delete:
 *     summary: Delete a branch by id
 *     tags: [Branches]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The branch id
 *     responses:
 *       200:
 *         description: Branch deleted successfully
 *       404:
 *         description: Branch not found
 */
router.delete('/:id', branchesController.delete)

export default router