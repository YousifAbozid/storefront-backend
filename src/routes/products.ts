import express from 'express'
import ProductsHandler from '../handlers/products'
import auth from '../utils/auth'

const productsRouter = express.Router()
const handler = new ProductsHandler()

// Get all products
productsRouter.get('/', handler.getProducts)

// Get a product by id
productsRouter.get('/:id', handler.getProductsById)

// Create a product
productsRouter.post('/', auth, handler.createProduct)

// Update a product
productsRouter.put('/:id', auth, handler.updateProduct)

// Delete a product
productsRouter.delete('/:id', auth, handler.deleteProduct)

export default productsRouter
