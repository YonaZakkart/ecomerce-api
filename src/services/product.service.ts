import { AppDataSource } from '../database/db'
import { Product } from '../entities/product.entity'
import { Category } from '../entities/category.entity'

const productRepository = AppDataSource.getRepository(Product)
const categoryRepository = AppDataSource.getRepository(Category)

export class ProductService {
    async findAll(): Promise<Product[]> {
        return await productRepository.find({ relations: ['category'] })
    }

    async create(nombre: string, precio: number, stock: number, categoriaId: string): Promise<Product> {
        if (!nombre || nombre.trim() === '') {
            throw new Error('El nombre no puede estar vacío')
        }
        if (precio <= 0) {
            throw new Error('El precio debe ser mayor a 0')
        }
        if (stock < 0) {
            throw new Error('El stock no puede ser negativo')
        }

        const category = await categoryRepository.findOneBy({ id: categoriaId })
        if (!category) {
            throw new Error('La categoría no existe')
        }

        const product = productRepository.create({ nombre, precio, stock, categoriaId })
        return await productRepository.save(product)
    }

    async update(id: string, nombre: string, precio: number, stock: number, categoriaId: string): Promise<Product | null> {
        const product = await productRepository.findOneBy({ id })
        if (!product) return null

        if (!nombre || nombre.trim() === '') {
            throw new Error('El nombre no puede estar vacío')
        }
        if (precio <= 0) {
            throw new Error('El precio debe ser mayor a 0')
        }
        if (stock < 0) {
            throw new Error('El stock no puede ser negativo')
        }

        const category = await categoryRepository.findOneBy({ id: categoriaId })
        if (!category) {
            throw new Error('La categoría no existe')
        }

        product.nombre = nombre
        product.precio = precio
        product.stock = stock
        product.categoriaId = categoriaId
        return await productRepository.save(product)
    }

    async delete(id: string): Promise<boolean> {
        const product = await productRepository.findOneBy({ id })
        if (!product) return false

        await productRepository.remove(product)
        return true
    }
}