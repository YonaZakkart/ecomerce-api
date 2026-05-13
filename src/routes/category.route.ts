import { Router } from 'express'
import { CategoryController } from '../controllers/category.controller'

const router = Router()
const categoryController = new CategoryController()

router.get('/', (req, res) => categoryController.getAll(req, res))

export default router