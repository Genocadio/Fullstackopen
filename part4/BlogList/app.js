const express = require('express')
require('express-async-errors') // this automaticaly passes any errors in router to middleware
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Blog = require('./models/blog')
const blogsRouter = require('./controlers/blogs')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require ('./utils/middleware')
const usersRouter = require('./controlers/users')
const loginRouter = require('./controlers/login')
const Resetrouter = require('./controlers/reset')

mongoose.set('strictQuery', false)

logger.info('connecting to: ', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
.then(() => {
  logger.info('connected to MongoDB')
})
.catch((error) => {
  logger.error('error connecting to MOngoDB: ', error.message)
})

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)
app.use('/api/blogs', middleware.userExtractor, blogsRouter) //use middle ware on one route
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing', Resetrouter)
}
app.use(middleware.unkownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
