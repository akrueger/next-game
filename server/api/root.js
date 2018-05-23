const express = require('express')

const app = express()

// Endpoints
const users = require('./users')
app.use('/users', users)

const groups = require('./groups')
app.use('/groups', groups)

const games = require('./games')
app.use('/games', games)

module.exports = app
