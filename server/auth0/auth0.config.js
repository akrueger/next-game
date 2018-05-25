const jwt = require('express-jwt')
const jwks = require('jwks-rsa')
const environment = process.NODE_ENV

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://app63125392.auth0.com/.well-known/jwks.json'
  }),
  audience:
    environment === 'production'
      ? 'https://next-game-pls.herokuapp.com/api/'
      : 'http://localhost:3001/api/',
  issuer: 'https://app63125392.auth0.com/',
  algorithms: ['RS256']
})

module.exports = jwtCheck
