import { Request, Response } from 'express'
import { UserService } from '../services/user.service'

const userService = new UserService()

export class UserController {
  async getAll(req: Request, res: Response): Promise<void> {
    const data = await userService.findAll()
    res.json({ status: 200, data })
  }

  async getById(req: Request, res: Response): Promise<void> {
    const user = await userService.findById(req.params.id as string)
    if (!user) {
      res.status(404).json({ status: 404, message: 'Usuario no encontrado' })
      return
    }
    res.json({ status: 200, data: user })
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { nombre, email } = req.body
      const data = await userService.create(nombre, email)
      res.status(201).json({ status: 201, data })
    } catch (error: any) {
      res.status(400).json({ status: 400, message: error.message })
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { nombre, email } = req.body
      const data = await userService.update(req.params.id as string, nombre, email)
      if (!data) {
        res.status(404).json({ status: 404, message: 'Usuario no encontrado' })
        return
      }
      res.json({ status: 200, data })
    } catch (error: any) {
      res.status(400).json({ status: 400, message: error.message })
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    const deleted = await userService.delete(req.params.id as string)
    if (!deleted) {
      res.status(404).json({ status: 404, message: 'Usuario no encontrado' })
      return
    }
    res.json({ status: 200, message: 'Usuario eliminado correctamente' })
  }
}