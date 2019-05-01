const express = require('express')

const app = express()

// Endpoints
const test = require('./test')
app.use('/test', test)

module.exports = app
