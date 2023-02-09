import express from 'express'
import jwt from 'jsonwebtoken'
import { UserStore } from '../models/user'
import bcrypt from 'bcrypt'

const store = new UserStore()
const pepper: string = process.env.PEPPER as string
const saltRounds: number = parseInt(process.env.SALT_ROUNDS as string)
const tokenSecret: string = process.env.TOKEN_SECRET as string

// This is the handler for the users route
export default class UsersHandler {
  // Get all users
  async getUsers(_req: express.Request, res: express.Response) {
    try {
      const users = await store.index()
      res.json(users)
    } catch (error) {
      res.status(404).json({ error: 'Could not get users' })
    }
  }

  // Get a user by id
  async getUserById(req: express.Request, res: express.Response) {
    try {
      const user = await store.show(parseInt(req.params.id))
      if (user) {
        res.json(user)
      } else {
        res.status(404).json({ error: 'User not found' })
      }
    } catch (error) {
      res.status(404).json({ error: 'Could not get user' })
    }
  }

  // Create a new user
  async createUser(req: express.Request, res: express.Response) {
    try {
      // Check for required fields
      if (!req.body.first_name || !req.body.last_name || !req.body.password) {
        return res.status(400).json({
          error: 'Missing name or password',
        })
      }
      // Hash password
      const hashedPassword = bcrypt.hashSync(
        req.body.password + pepper,
        saltRounds
      )
      // Then create user
      let user = await store.create({
        first_name: req.body.first_name as string,
        last_name: req.body.last_name as string,
        password: hashedPassword,
      })
      delete user.password

      // @ts-ignore
      user.token = jwt.sign(
        { id: user.id, first_name: user.first_name, last_name: user.last_name },
        tokenSecret
      )
      res.status(201).json(user)
    } catch (error) {
      return res.status(500).json({ error: 'Could not create user' })
    }
  }

  // Update a user
  async updateUser(req: express.Request, res: express.Response) {
    try {
      // Check for required fields
      if (!req.body.first_name || !req.body.last_name || !req.body.password) {
        return res.status(400).json({
          error: 'Missing required parameters',
        })
      }
      let user = await store.update({
        id: parseInt(req.params.id as string),
        first_name: req.body.first_name as string,
        last_name: req.body.last_name as string,
        password: req.body.password as string,
      })
      delete user.password
      res.status(201).json(user)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  // Delete a user
  async deleteUser(req: express.Request, res: express.Response) {
    try {
      await store.delete(parseInt(req.params.id as string))
      res.json({ message: `Deleted user ${req.params.id}` })
    } catch (error) {
      res.status(500).json({ error: 'Could not delete user' })
    }
  }
}
