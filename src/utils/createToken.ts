import jwt from 'jsonwebtoken'

const tokenSecret: string = process.env.TOKEN_SECRET as string

export const createJWTToken = (
  id: number,
  first_name: string,
  last_name: string
): string => {
  return jwt.sign({ id, first_name, last_name }, tokenSecret)
}
