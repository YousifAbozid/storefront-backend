import express from 'express'
import authToken from '../utils/auth'
import OrdersHandler from '../handlers/orders'

const ordersRouter = express.Router()
const handler = new OrdersHandler()

// Get all orders
ordersRouter.get('/', authToken, handler.getOrders)

// Get order by id
ordersRouter.get('/:id', authToken, handler.getOrderById)

// Get orders by user id
ordersRouter.get('/user-orders/:id', authToken, handler.getCurrentOrders)

// Create new order
ordersRouter.post('/create', authToken, handler.createOrder)

// Add product to order
ordersRouter.post('/add-product/:id', authToken, handler.addProductToOrder)

// Update order
ordersRouter.put('/:id', authToken, handler.updateOrder)

// Delete order
ordersRouter.delete('/:id', authToken, handler.deleteOrder)

export default ordersRouter
