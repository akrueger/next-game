const express = require('express')
const router = express.Router()

router
  .get('/', async (request, response) => {
    // Read all groups
    const resultSet = await request.app
      .get('db')
      .groups.find({}, { fields: 'name' })

    const refinedResult = resultSet.map(group => group.name)

    return response.json(refinedResult)
  })
  // Read group
  .get('/:id', async (request, response) => {
    const resultSet = await request.app.get('db').groups.findOne(
      {
        id: request.params.id
      },
      {
        fields: 'name'
      }
    )

    const refinedResult = resultSet.name

    return response.json(refinedResult)
  })
  // Create/Update group
  .post('/', async (request, response) => {
    const resultSet = await request.app
      .get('db')
      .groups.save({ name: request.body.name })

    return response.sendStatus(200)
  })
  // Delete group
  .delete('/:name', async (request, response) => {
    const resultSet = await request.app
      .get('db')
      .groups.destroy({ name: request.params.name })

    return response.sendStatus(200)
  })

module.exports = router
