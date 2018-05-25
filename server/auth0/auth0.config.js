const jwt = require('express-jwt')
const jwks = require('jwks-rsa')
console.log('process.env', process.env)
console.log('NODE_ENV', process.NODE_ENV)

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://app63125392.auth0.com/.well-known/jwks.json'
  }),
  audience: 'https://next-game-pls.herokuapp.com/api/',
  issuer: 'https://app63125392.auth0.com/',
  algorithms: ['RS256']
})

module.exports = jwtCheck
