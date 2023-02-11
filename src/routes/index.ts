import express from 'express'
import productsRouter from './products'
import usersRouter from './users'
import ordersRouter from './orders'

const apiRouter = express.Router()

apiRouter.use('/products', productsRouter)
apiRouter.use('/users', usersRouter)
apiRouter.use('/orders', ordersRouter)

export default apiRouter
