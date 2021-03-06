const express = require('express')
const helmet = require('helmet')
const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS
const compression = require('compression')
const path = require('path')
const http = require('http')
const massive = require('massive')
const parseDbConnectionString = require('pg-connection-string').parse
const jwtCheck = require('./api/auth0/jwt.config')
const api = require('./api/root')

const app = express()

const environment = app.get('env')

const port = process.env.PORT || '3001'
app.set('port', port)

// Logger
const pino = require('pino')
const pinoExpress = require('express-pino-logger')
const logger = pino({
  prettyPrint: environment !== 'production'
})
const expressLogger = pinoExpress({ logger })

app.use(expressLogger)

// Security
app.use(
  helmet({
    expectCt: true,
    dnsPrefetchControl: true,
    frameguard: true,
    hidePoweredBy: true,
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true
    },
    ieNoOpen: true,
    noCache: true,
    noSniff: true,
    referrerPolicy: true,
    xssFilter: true
  })
)

// HTTPS
app.use(redirectToHTTPS([/localhost:4200/]))

// Gzip
app.use(compression())

// Request / Response parsers
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Angular DIST output folder
app.use(express.static(path.join(__dirname, '../dist/next-game')))

// REST API endpoints with auth0 protection
app.use('/api', jwtCheck, api)

// Fall-through: send all other requests to the Angular app
app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname, '../dist/next-game/index.html'))
})

// Massive-js Postgres connection
const dbConnectionConfig =
  environment === 'production'
    ? parseDbConnectionString(process.env.DATABASE_URL)
    : {
        host: 'localhost',
        port: 5432,
        database: 'next-game',
        user: 'akrueger',
        password: null
      }

massive({
  host: dbConnectionConfig.host,
  port: dbConnectionConfig.port,
  database: dbConnectionConfig.database,
  user: dbConnectionConfig.user,
  password: dbConnectionConfig.password,
  ssl: environment === 'production'
}).then(instance => {
  app.set('db', instance)

  const server = http.createServer(app)

  server.listen(port, () => console.log(`Running on localhost:${port}`))
})
