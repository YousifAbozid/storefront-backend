import express from 'express' // Import express
import bodyParser from 'body-parser' // Import body-parser
import dotenv from 'dotenv' // Import dotenv
import apiRouter from './routes' // Import routes

const app: express.Application = express() // Create a new express app instance
dotenv.config() // Load environment variables from .env file
const port = process.env.PORT || 3000 // The port the express app will listen on
app.use(bodyParser.json()) // Parse JSON bodies

// Use the apiRouter
app.use('/api', apiRouter)

// root endpoint
app.use('/', (req: express.Request, res: express.Response): void => {
  res.send('Server Is Running!')
})

// The express app will listen on the port
app.listen(port, (): void =>
  console.log(
    `Server running on port ${port} \nClick on the link to visit it ==> (http://localhost:${port})`
  )
)

export default app
