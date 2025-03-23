/**
 * @openapi
 * components:
 *   schemas:
 *     Branch:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for the branch
 *           example: "branch_123abc"
 *         name:
 *           type: string
 *           description: The name of the branch
 *           example: "Downtown Branch"
 *         address:
 *           type: string
 *           description: The address of the branch
 *           example: "123 Main St, Lagos, Nigeria"
 *         phone:
 *           type: string
 *           description: The contact phone number of the branch
 *           example: "+2348012345678"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the branch was created
 *           example: "2024-03-23T12:00:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the branch was last updated
 *           example: "2024-03-23T12:30:00Z"
 */
export type Branch = {
    id: string;
    name: string;
    address: string;
    phone: string;
    createdAt: Date;
    updatedAt: Date;
};