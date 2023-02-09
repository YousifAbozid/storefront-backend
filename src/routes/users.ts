import express from 'express'
import UsersHandler from '../handlers/users'

const usersRouter = express.Router()
const usersHandler = new UsersHandler()

// Get all users
usersRouter.get('/', usersHandler.getUsers)

// Get a user by id
usersRouter.get('/:id', usersHandler.getUserById)

// Create a user
usersRouter.post('/', usersHandler.createUser)

// Update a user
usersRouter.put('/:id', usersHandler.updateUser)

// Delete a user
usersRouter.delete('/:id', usersHandler.deleteUser)

export default usersRouter
