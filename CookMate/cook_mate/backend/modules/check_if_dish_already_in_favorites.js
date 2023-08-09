const { db } = require('../config/db_SQL')

const check_if_dish_already_in_favorites = async (favorite_id) => {
    return db('users_favorites_connection')
        .select("id")
        .where({favorite_id})
        .returning("*")
}
module.exports = { check_if_dish_already_in_favorites };