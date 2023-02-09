// @ts-ignore
import pool from '../utils/database'

export type Product = {
  id?: number
  name: string
  price?: number
}

export class ProductStore {
  // Get all products
  async index(): Promise<Product[]> {
    try {
      // @ts-ignore
      const conn = await pool.connect()
      const sql = 'SELECT * FROM products'
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`)
    }
  }

  // Get a product by id
  async show(id: number): Promise<Product> {
    try {
      // @ts-ignore
      const conn = await pool.connect()
      const sql = 'SELECT * FROM products WHERE id=($1)'
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not find product ${id}. Error: ${err}`)
    }
  }

  // Create a new product
  async create(p: Product): Promise<Product> {
    try {
      // @ts-ignore
      const conn = await pool.connect()
      const sql =
        'INSERT INTO products (name, price, category, url, description) VALUES($1, $2, $3, $4, $5) RETURNING *'
      const result = await conn.query(sql, [p.name, p.price])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not add new product ${p.name}. Error: ${err}`)
    }
  }
}
