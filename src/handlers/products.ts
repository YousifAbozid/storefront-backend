import express from 'express'
import { ProductStore } from '../models/product'

const store = new ProductStore()

// This is the handler for the products route
export default class ProductsHandler {
  // Get all products
  async getProducts(_req: express.Request, res: express.Response) {
    try {
      const products = await store.index()
      res.json(products)
    } catch (error) {
      res.status(404).json({ error: 'Could not get products' })
    }
  }

  // Get a product by id
  async getProductsById(req: express.Request, res: express.Response) {
    try {
      const product = await store.show(parseInt(req.params.id))
      res.json(product)
    } catch (error) {
      res.status(404).json({ error: 'Could not get product' })
    }
  }

  // Create a product
  async createProduct(req: express.Request, res: express.Response) {
    try {
      if (!req.body.name) {
        return res.status(400).json({ error: 'Product name is required' })
      }
      const product = await store.create({
        name: req.body.name as string,
        price: parseFloat(req.body.price as string),
      })
      res.status(201).json(product)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  // Update a product
  async updateProduct(req: express.Request, res: express.Response) {
    try {
      if (!req.body.name) {
        return res.status(400).json({ error: 'Product name is required' })
      }
      const product = await store.update({
        id: parseInt(req.params.id as string),
        name: req.body.name as string,
        price: parseFloat(req.body.price as string),
      })
      res.status(201).json(product)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  // Delete a product
  async deleteProduct(req: express.Request, res: express.Response) {
    try {
      await store.delete(parseInt(req.params.id as string))
      res.json({ message: 'Product deleted successfully' })
    } catch (error) {
      res.status(500).json(error)
    }
  }
}
