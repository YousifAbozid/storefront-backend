import express from 'express'
import { OrderStore } from '../models/order'

const store = new OrderStore()

// This is the handler class
export default class OrdersHandler {
  // Get all orders
  async getOrders(_req: express.Request, res: express.Response) {
    try {
      const orders = await store.index()
      res.json(orders)
    } catch (e) {
      res.status(500).json(e)
    }
  }

  // Get order by id
  async getOrderById(req: express.Request, res: express.Response) {
    try {
      const order = await store.show(parseInt(req.params.id))
      res.json(order)
    } catch (e) {
      res.status(400).json(e)
    }
  }

  // Create new order
  async createOrder(req: express.Request, res: express.Response) {
    try {
      const { user_id, status } = req.body

      if (!user_id || !status) {
        return res.status(400).json({
          error: 'Missing one or more required parameters',
        })
      }

      const order = await store.create({
        user_id: parseInt(user_id as string),
        status: status as string,
      })

      res.status(201).json(order)
    } catch (e) {
      res.status(400).json(e)
    }
  }

  // Update order
  async updateOrder(req: express.Request, res: express.Response) {
    try {
      const { user_id, status } = req.body
      const id = req.params.id

      if (!id || !user_id || !status) {
        return res.status(400).json({
          error: 'Missing one or more required parameters',
        })
      }

      const order = await store.update({
        id: parseInt(req.params.id as string),
        user_id: parseInt(user_id as string),
        status: status as string,
      })
      res.status(201).json(order)
    } catch (e) {
      res.status(500).json(e)
    }
  }

  // Delete order
  async deleteOrder(req: express.Request, res: express.Response) {
    try {
      await store.delete(parseInt(req.params.id as string))
      res.json({ status: `Deleted order ${req.params.id}` })
    } catch (e) {
      res.status(500).json(e)
    }
  }

  // Add product to order
  async addProductToOrder(req: express.Request, res: express.Response) {
    try {
      const order_id = parseInt(req.params.id)
      const product_id = parseInt(req.body.product_id as string)
      const quantity = parseInt(req.body.quantity as string)

      if (!order_id || !product_id || !quantity) {
        return res.status(400).json({
          error: 'Missing one or more required parameters',
        })
      }

      const product = await store.addProductToOrder({
        order_id,
        product_id,
        quantity,
      })

      res.json(product)
    } catch (e) {
      res.status(400).json(e)
    }
  }

  // Get all products in order
  async getCurrentOrders(req: express.Request, res: express.Response) {
    try {
      const currentOrders = await store.getCurrentOrders(
        parseInt(req.params.id as string)
      )
      res.json(currentOrders)
    } catch (e) {
      res.status(400).json(e)
    }
  }
}
