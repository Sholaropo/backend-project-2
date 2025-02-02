import { employeesController } from '@controllers/employee'
import express from 'express'
const router = express.Router()

router.post('/', employeesController.create)
router.get('/', employeesController.readAll)
router.get('/:id', employeesController.readSingle)

export default router