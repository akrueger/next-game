const express = require('express')
const router = express.Router()

router
  // Read all games
  .get('/', async (request, response) => {
    const resultSet = await request.app
      .get('db')
      .games.find({}, { fields: 'name' })

    const refinedResult = resultSet.map(game => game.name)

    return response.json(refinedResult)
  })
  // Read game
  .get('/:id', async (request, response) => {
    const resultSet = await request.app.get('db').games.findOne(
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
  // Create/Update game
  .post('/', async (request, response) => {
    const resultSet = await request.app
      .get('db')
      .games.save({ name: request.body.name })

    return response.sendStatus(200)
  })
  // Delete game
  .delete('/:name', async (request, response) => {
    const resultSet = await request.app
      .get('db')
      .games.destroy({ name: request.params.name })

    return response.sendStatus(200)
  })

module.exports = router
