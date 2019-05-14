const express = require('express')

const app = express()

// Endpoints
const state = require('./state')
app.use('/state', state)

const groups = require('./groups')
app.use('/groups', groups)

const games = require('./games')
app.use('/games', games)

module.exports = app
