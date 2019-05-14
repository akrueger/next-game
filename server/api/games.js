const express = require('express')
const router = express.Router()
const bgg = require('boardgamegeek')

/********
/games
********/

router
  // Read all games
  .get('/', async (request, response) => {
    const sql = 'SELECT * FROM games;'

    try {
      const resultSet = await request.app.get('db').query(sql)

      return response.json(resultSet)
    } catch (error) {
      console.error(error)
      return response.sendStatus(500)
    }
  })
  // Read game by game ID
  .get('/:id', async (request, response) => {
    try {
      const resultSet = await request.app.get('db').games.findOne({
        game_id: request.params.id
      })

      return response.json(resultSet)
    } catch (error) {
      console.error(error)
      return response.sendStatus(500)
    }
  })
  // Read game by game name
  .get('/:name', async (request, response) => {
    try {
      const resultSet = await request.app.get('db').games.findOne({
        game_name: request.params.name
      })

      return response.json(resultSet)
    } catch (error) {
      console.error(error)
      return response.sendStatus(500)
    }
  })
  // Create game
  .post('/', async (request, response) => {
    try {
      // Check if game already in DB
      const existingGame = await request.app.get('db').games.findOne(
        {
          game_name: request.body.name
        },
        {
          decompose: {
            pk: 'game_id',
            columns: {
              game_id: 'id',
              game_name: 'name'
            }
          }
        }
      )

      if (existingGame) {
        // Game found
        return response.json(existingGame)
      } else {
        // No game found, create game
        const resultSet = await request.app.get('db').games.insert(
          { game_name: request.body.name },
          {
            decompose: {
              pk: 'game_id',
              columns: {
                game_id: 'id',
                game_name: 'name'
              }
            }
          }
        )

        return response.json(resultSet)
      }
    } catch (error) {
      console.error(error)
      return response.sendStatus(500)
    }
  })
  // Delete game by game ID
  .delete('/:id', async (request, response) => {
    try {
      await request.app.get('db').games.destroy({ game_id: request.params.id })

      return response.sendStatus(204)
    } catch (error) {
      console.error(error)
      return response.sendStatus(500)
    }
  })
  // Delete game by game name
  .delete('/:name', async (request, response) => {
    try {
      await request.app
        .get('db')
        .games.destroy({ game_name: request.params.name })

      return response.sendStatus(204)
    } catch (error) {
      console.error(error)
      return response.sendStatus(500)
    }
  })
  .get('/search', async (request, response) => {
    const { gameName } = request.query

    try {
      const game = await bgg.getBoardGame(gameName)
      console.log(game)
    } catch (error) {
      console.error(error)
      return response.sendStatus(500)
    }
  })

module.exports = router
