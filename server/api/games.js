const express = require('express')
const router = express.Router()

/********
/games
********/

router
  // Read all games
  .get('/', async (request, response) => {
    const sql = 'SELECT * FROM games;'

    const resultSet = await request.app.get('db').query(sql)

    return response.json(resultSet)
  })
  // Read game by game ID
  .get('/:id', async (request, response) => {
    const resultSet = await request.app.get('db').games.findOne({
      game_id: request.params.id
    })

    return response.json(resultSet)
  })
  // Read game by game name
  .get('/:name', async (request, response) => {
    const resultSet = await request.app.get('db').games.findOne({
      game_name: request.params.name
    })

    return response.json(resultSet)
  })
  // Create game
  .post('/', async (request, response) => {
    // Check if game already in DB
    const existingGame = await request.app.get('db').games.findOne({
      game_name: request.body.name
    })

    if (existingGame) {
      // Game found
      return response.json(game)
    } else {
      // No game found, create game
      const resultSet = await request.app
        .get('db')
        .games.insert({ game_name: request.body.name })

      return response.json(resultSet)
    }
  })
  // Delete game by game ID
  .delete('/:id', async (request, response) => {
    await request.app.get('db').games.destroy({ game_id: request.params.id })

    return response.sendStatus(200)
  })
  // Delete game by game name
  .delete('/:name', async (request, response) => {
    await request.app
      .get('db')
      .games.destroy({ game_name: request.params.name })

    return response.sendStatus(200)
  })

module.exports = router
