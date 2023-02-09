import express from 'express'
import productsRouter from './products'
import usersRouter from './users'

const apiRouter = express.Router()

apiRouter.use('/products', productsRouter)
apiRouter.use('/users', usersRouter)

export default apiRouter
