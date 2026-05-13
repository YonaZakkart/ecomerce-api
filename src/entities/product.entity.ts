import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'
import { Category } from './category.entity'

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  nombre!: string

  @Column('decimal')
  precio!: number

  @Column('int')
  stock!: number

  @Column()
  categoriaId!: string

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'categoriaId' })
  category!: Category
}