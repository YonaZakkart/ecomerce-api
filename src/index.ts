import 'reflect-metadata'
import express, { Request, Response } from 'express'
import { AppDataSource } from './database/db'
import userRouter from './routes/user.route'
import categoryRouter from './routes/category.route'
import productRouter from './routes/product.route'

const app = express()

app.use(express.json())

app.get('/', (req: Request, res: Response) => res.send('Hello World!'))
app.use('/user', userRouter)
app.use('/category', categoryRouter)
app.use('/product', productRouter)

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected')
    app.listen(Number(process.env.PORT) || 3000, () =>
      console.log(`Server is running on port ${process.env.PORT || 3000}`)
    )
  })
  .catch((error) => console.error('Database connection error:', error))