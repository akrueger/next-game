const jwt = require('express-jwt')
const jwksRsa = require('jwks-rsa')
import auth0Config from '../../../auth0.config.json'
const environment = process.env.NODE_ENV

auth0Config.domain

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
