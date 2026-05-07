import { AppDataSource } from '../database/db'
import { User } from '../entities/user.entity'

const userRepository = AppDataSource.getRepository(User)

export class UserService {
  async findAll(): Promise<User[]> {
    return await userRepository.find()
  }

  async findById(id: string): Promise<User | null> {
    return await userRepository.findOneBy({ id })
  }

  async create(nombre: string, email: string): Promise<User> {
    if (!nombre || nombre.trim() === '') {
      throw new Error('El nombre no puede estar vacío')
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      throw new Error('El email no tiene un formato válido')
    }

    const user = userRepository.create({ nombre, email })
    return await userRepository.save(user)
  }

  async update(id: string, nombre: string, email: string): Promise<User | null> {
    const user = await userRepository.findOneBy({ id })
    if (!user) return null

    if (!nombre || nombre.trim() === '') {
      throw new Error('El nombre no puede estar vacío')
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      throw new Error('El email no tiene un formato válido')
    }

    user.nombre = nombre
    user.email = email
    return await userRepository.save(user)
  }

  async delete(id: string): Promise<boolean> {
    const user = await userRepository.findOneBy({ id })
    if (!user) return false

    await userRepository.remove(user)
    return true
  }
}