const jwt = require('express-jwt')
const jwks = require('jwks-rsa')

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://indigo-squid.auth0.com/.well-known/jwks.json'
  }),
  audience: 'http://localhost:3001/api/',
  issuer: 'https://indigo-squid.auth0.com/',
  algorithms: ['RS256']
})

module.exports = jwtCheck
