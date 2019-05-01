const express = require('express')
const router = express.Router()

router.post('/', async (request, response) => {
  console.log(request)
})

module.exports = router
