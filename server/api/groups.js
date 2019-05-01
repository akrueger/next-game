const express = require('express')
const router = express.Router()

/********
/games
********/

router
  // Read groups by user ID
  .get('/', async (request, response) => {
    const userId = request.user.sub

    const sql =
      'SELECT groups.group_name FROM groups INNER JOIN groups_users ON groups.group_id = groups_users.group_id WHERE groups_users.user_id = ${userId};'

    const resultSet = await request.app.get('db').query(sql, { userId })

    return response.json(resultSet)
  })
  // Read group by group ID
  .get('/:id', async (request, response) => {
    const resultSet = await request.app.get('db').groups.findOne({
      group_id: request.params.id
    })
    return response.json(resultSet)
  })
  // Read group by group name
  .get('/:name', async (request, response) => {
    const resultSet = await request.app.get('db').groups.findOne({
      group_name: request.params.name
    })
    return response.json(resultSet)
  })
  // Create group
  .post('/', async (request, response) => {
    const existingGroup = await request.app.get('db').groups.findOne({
      group_name: request.body.groupName
    })

    if (existingGroup) {
      // Group found
      // TODO: Error, group already exists
      // return response.json(game)
    } else {
      // No group found, create group
      const userId = request.user.sub

      const resultSet = await request.app.get('db').groups.insert(
        {
          group_name: request.body.groupName,
          groups_users: [
            {
              group_id: undefined,
              user_id: userId
            }
          ]
        },
        { deepInsert: true }
      )
      return response.json(resultSet)
    }
  })
  // Delete group by group name
  .delete('/', async (request, response) => {
    const { groupName } = request.query
    await request.app.get('db').groups.destroy({ group_name: groupName })
    return response.sendStatus(200)
  })
  // Delete group by group ID
  .delete('/:id', async (request, response) => {
    await request.app.get('db').groups.destroy({ group_id: request.params.id })
    return response.sendStatus(200)
  })

module.exports = router
