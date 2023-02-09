import { Pool } from 'pg'

const {
  POSTGRES_HOST,
  POSTGRES_DB_DEV,
  POSTGRES_DB_TEST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  NODE_ENV,
} = process.env

let pool
console.log(NODE_ENV)

if (NODE_ENV === 'test') {
  pool = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB_TEST,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  })
}

if (NODE_ENV === 'dev') {
  pool = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB_DEV,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  })
}

export default pool
