const express = require('express')
const router = express.Router()

router.get('/', async (request, response) => {
  const result = await request.app.get('db').query('select * from users;')

  return response.json(result)
})

module.exports = router
