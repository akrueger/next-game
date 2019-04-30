const express = require('express')
const router = express.Router()

/********
/users
********/

router.get('/', async (request, response) => {
  const sql = 'SELECT * FROM users;'
  const result = await request.app.get('db').query(sql)

  return response.json(result)
})

module.exports = router
