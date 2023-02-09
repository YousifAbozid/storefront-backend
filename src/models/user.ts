// @ts-ignore
import pool from '../utils/database'

export type User = {
  id?: number
  first_name?: string
  last_name?: string
  password?: string
}

export class UserStore {
  // Get all users
  async index(): Promise<User[]> {
    try {
      // @ts-ignore
      const conn = await pool.connect()
      const sql = 'SELECT * FROM users'
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (error) {
      throw new Error(`Could not get users. Error: ${error}`)
    }
  }

  // Get a user by id
  async show(id: number): Promise<User> {
    try {
      const sql = 'SELECT * FROM users WHERE id=($1)'
      // @ts-ignore
      const conn = await pool.connect()
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Could not find user ${id}. Error: ${error}`)
    }
  }

  // Create a new user
  async createUser(u: User): Promise<User> {
    try {
      // @ts-ignore
      const conn = await pool.connect()
      const sql =
        'INSERT INTO users (first_name, last_name, password) VALUES($1, $2, $3) RETURNING *'
      const result = await conn.query(sql, [
        u.first_name,
        u.last_name,
        u.password,
      ])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Could not add new user ${u.first_name}. Error: ${error}`)
    }
  }

  // Update a user
  async updateUser(u: User): Promise<User> {
    try {
      // @ts-ignore
      const conn = await pool.connect()
      const sql = `UPDATE users SET first_name = $2, last_name = $3, password = $4 WHERE id = $1 RETURNING *`
      const result = await conn.query(sql, [
        u.id,
        u.first_name,
        u.last_name,
        u.password,
      ])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not update user ${u.id}. Error: ${err}`)
    }
  }

  // Delete a user
  async deleteUser(id: number): Promise<User> {
    try {
      // @ts-ignore
      const conn = await pool.connect()
      const sql = 'DELETE FROM users WHERE id=($1)'
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not delete user ${id}. Error: ${err}`)
    }
  }
}
