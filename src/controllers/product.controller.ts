import { Request, Response } from 'express'
import { ProductService } from '../services/product.service'

const productService = new ProductService()

export class ProductController {
  async getAll(req: Request, res: Response): Promise<void> {
    const data = await productService.findAll()
    res.json({ status: 200, data })
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { nombre, precio, stock, categoriaId } = req.body
      const data = await productService.create(nombre, precio, stock, categoriaId)
      res.status(201).json({ status: 201, data })
    } catch (error: any) {
      res.status(400).json({ status: 400, message: error.message })
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { nombre, precio, stock, categoriaId } = req.body
      const data = await productService.update(req.params.id as string, nombre, precio, stock, categoriaId)
      if (!data) {
        res.status(404).json({ status: 404, message: 'Producto no encontrado' })
        return
      }
      res.json({ status: 200, data })
    } catch (error: any) {
      res.status(400).json({ status: 400, message: error.message })
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    const deleted = await productService.delete(req.params.id as string)
    if (!deleted) {
      res.status(404).json({ status: 404, message: 'Producto no encontrado' })
      return
    }
    res.json({ status: 200, message: 'Producto eliminado correctamente' })
  }
}