const { db } = require('../config/db_SQL')

const check_if_dish_exists_in_db = async (dish_id) => {
    return db('favorites')
        .select("dish_id")
        .where({dish_id})
        .returning("*")
}
module.exports = { check_if_dish_exists_in_db };