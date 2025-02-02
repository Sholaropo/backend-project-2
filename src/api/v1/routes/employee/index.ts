import { employeesController } from '@controllers/employee'
import express from 'express'
const router = express.Router()

router.post('/', employeesController.create)
router.get('/', employeesController.readAll)
router.get('/:id', employeesController.readSingle)
router.put('/:id', employeesController.update)

export default router