const express = require('express')
const router = express.Router()

const app = express()

const environment = app.get('env')

// Logger
const pino = require('pino')
const logger = pino({
  prettyPrint: environment !== 'production'
})

/********
/state
********/

router
  // Read state by user
  .get('/', async (request, response) => {
    const userId = request.user.sub

    const adminsSql = `SELECT
      group_id,
      user_id
    FROM
      groups_users
    WHERE
      role_id = 1
      AND group_id IN (
        SELECT
          groups.group_id
      FROM
        groups
        INNER JOIN groups_users ON groups.group_id = groups_users.group_id
      WHERE
        groups_users.user_id = '${userId}'
  );`

    const membersSql = `SELECT
      group_id,
      user_id
    FROM
      groups_users
    WHERE group_id IN (
      SELECT
        groups.group_id
      FROM
        groups
        INNER JOIN groups_users ON groups.group_id = groups_users.group_id
      WHERE
        groups_users.user_id = '${userId}'
    );`

    const groupsSql = `SELECT
        groups.group_id,
        groups.group_name
      FROM
        groups
        INNER JOIN groups_users ON groups.group_id = groups_users.group_id
      WHERE
        groups_users.user_id = '${userId}';`

    const gamesSql = `SELECT
        games.game_id,
        games.game_name
      FROM
        games
        INNER JOIN users_games ON games.game_id = users_games.game_id
      WHERE
        users_games.user_id = '${userId}';`

    try {
      const adminsResultSet = await request.app
        .get('db')
        .query(adminsSql, { userId })

      const membersResultSet = await request.app
        .get('db')
        .query(membersSql, { userId })

      const groupsResultSet = await request.app.get('db').query(
        groupsSql,
        { userId },
        {
          decompose: {
            pk: 'group_id',
            columns: {
              group_id: 'id',
              group_name: 'name'
            }
          }
        }
      )

      const gamesResultSet = await request.app.get('db').query(
        gamesSql,
        { userId },
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

      const groups = groupsResultSet.map(group => ({
        admins: adminsResultSet
          .filter(admin => admin.group_id === group.id)
          .map(admin => ({ id: admin.user_id })),
        members: membersResultSet
          .filter(member => member.group_id === group.id)
          .map(member => ({ id: member.user_id })),
        ...group
      }))

      const games = gamesResultSet

      return response.json({ groups, games })
    } catch (error) {
      return response.sendStatus(500)
    }
  })

module.exports = router
