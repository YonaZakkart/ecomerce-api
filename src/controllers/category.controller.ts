import { Request, Response } from 'express'
import { CategoryService } from '../services/category.service'

const categoryService = new CategoryService()

export class CategoryController {
  async getAll(req: Request, res: Response): Promise<void> {
    const data = await categoryService.findAll()
    res.json({ status: 200, data })
  }
}