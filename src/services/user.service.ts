import { AppDataSource } from '../database/db'
import { User } from '../entities/user.entity'
import { IUser, IUserResponse } from '../interfaces/user.interface'

const userRepository = AppDataSource.getRepository(User)

export class UserService {
  async findAll(): Promise<IUserResponse[]> {
    const users = await userRepository.find()
    return users.map(user => ({
      id: user.id,
      nombre: user.nombre,
      email: user.email
    }))
  }

  async findById(id: string): Promise<IUserResponse | null> {
    const user = await userRepository.findOneBy({ id })
    if (!user) return null
    return {
      id: user.id,
      nombre: user.nombre,
      email: user.email
    }
  }

  async create(data: IUser): Promise<IUserResponse> {
    if (!data.nombre || data.nombre.trim() === '') {
      throw new Error('El nombre no puede estar vacío')
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      throw new Error('El email no tiene un formato válido')
    }

    if (!data.password || data.password.trim() === '') {
      throw new Error('La contraseña no puede estar vacía')
    }

    const user = userRepository.create(data)
    const saved = await userRepository.save(user)
    return {
      id: saved.id,
      nombre: saved.nombre,
      email: saved.email
    }
  }

  async update(id: string, data: IUser): Promise<IUserResponse | null> {
    const user = await userRepository.findOneBy({ id })
    if (!user) return null

    if (!data.nombre || data.nombre.trim() === '') {
      throw new Error('El nombre no puede estar vacío')
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      throw new Error('El email no tiene un formato válido')
    }

    if (!data.password || data.password.trim() === '') {
      throw new Error('La contraseña no puede estar vacía')
    }

    user.nombre = data.nombre
    user.email = data.email
    user.password = data.password
    const saved = await userRepository.save(user)
    return {
      id: saved.id,
      nombre: saved.nombre,
      email: saved.email
    }
  }

  async delete(id: string): Promise<boolean> {
    const user = await userRepository.findOneBy({ id })
    if (!user) return false

    await userRepository.remove(user)
    return true
  }
}