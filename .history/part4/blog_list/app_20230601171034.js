// require('dotenv').config()
const config = require('./utils/config')
const logger = require('./utils/logger')

const express = require('express')
// const expressJwt = require('express-jwt')

const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('express-async-errors')


const blogsRouter = require('./controllers/blogs.js')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const middleware = require('./utils/middleware')
const userExtractor = require('./utils/middleware').userExtractor
const userExtractor = require('./middleware/userExtractor')

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())

app.use(express.static('build'))
app.use(express.json())

// app.use('/api/blogs', expressJwt({ secret: process.env.SECRET }))

app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

// app.use(middleware.userExtractor)

app.use('/api/blogs', userExtractor, blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app