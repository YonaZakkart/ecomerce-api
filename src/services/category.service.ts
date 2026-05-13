import { AppDataSource } from '../database/db'
import { Category } from '../entities/category.entity'

const categoryRepository = AppDataSource.getRepository(Category)

export class CategoryService {
    async findAll(): Promise<Category[]> {
        return await categoryRepository.find()
    }
}