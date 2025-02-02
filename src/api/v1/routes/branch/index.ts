import { branchesController } from '@controllers/branch'
import express from 'express'
const router = express.Router()

router.post('/', branchesController.create)
router.get('/', branchesController.readAll)
router.get('/:id', branchesController.readSingle)
router.put('/:id', branchesController.update)
router.delete('/:id', branchesController.delete)

export default router