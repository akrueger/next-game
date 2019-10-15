const jwt = require('express-jwt')
const jwksRsa = require('jwks-rsa')
const environment = process.env.NODE_ENV
const path = require('path')
const fs = require('fs')

let auth0Config = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, '../../../auth0.config.json'),
    'utf-8'
  )
)

const jwtCheck = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${auth0Config.domain}/.well-known/jwks.json`
  }),
  audience:
    environment === 'production'
      ? auth0Config.audience.production
      : auth0Config.audience.development,
  issuer: `https://${auth0Config.domain}/`,
  algorithms: ['RS256']
})

module.exports = jwtCheck
