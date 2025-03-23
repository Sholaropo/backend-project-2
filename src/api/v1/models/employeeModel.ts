/**
 * @openapi
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for the employee
 *           example: "emp_456xyz"
 *         name:
 *           type: string
 *           description: The full name of the employee
 *           example: "John Doe"
 *         position:
 *           type: string
 *           description: The job position of the employee
 *           example: "Software Engineer"
 *         department:
 *           type: string
 *           description: The department the employee belongs to
 *           example: "IT"
 *         email:
 *           type: string
 *           format: email
 *           description: The official email of the employee
 *           example: "johndoe@example.com"
 *         phone:
 *           type: string
 *           description: The contact phone number of the employee
 *           example: "+2348023456789"
 *         branchId:
 *           type: string
 *           description: The ID of the branch the employee is associated with
 *           example: "branch_123abc"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the employee record was created
 *           example: "2024-03-23T14:00:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the employee record was last updated
 *           example: "2024-03-23T15:30:00Z"
 */
export type Employee = {
    id: string;
    name: string;
    position: string;
    department: string;
    email: string;
    phone: string;
    branchId: string;
    createdAt: Date;
    updatedAt: Date;
};