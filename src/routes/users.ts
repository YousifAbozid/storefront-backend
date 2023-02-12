import express from 'express'
import UsersHandler from '../handlers/users'
import auth from '../utils/auth'

const usersRouter = express.Router()
const usersHandler = new UsersHandler()

// Get all users
usersRouter.get('/', auth, usersHandler.getUsers)

// Get a user by id
usersRouter.get('/:id', auth, usersHandler.getUserById)

// Create a user
usersRouter.post('/', usersHandler.createUser)

// Update a user
usersRouter.put('/:id', auth, usersHandler.updateUser)

// Delete a user
usersRouter.delete('/:id', auth, usersHandler.deleteUser)

export default usersRouter
