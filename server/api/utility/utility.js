const utilities = {
  extractAuth0UserId: function(auth0UserId) {
    return auth0UserId.split('|')[1]
  }
}

module.exports = utilities
