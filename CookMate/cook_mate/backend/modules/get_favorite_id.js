const { db } = require('../config/db_SQL')

const get_favorite_id = async (id_of_the_dish) => {
    const dish_id = id_of_the_dish.toString();
    console.log("searching for favorite_id of the dish:", dish_id);
    return db('favorites')
        .select("favorite_id")
        .where({dish_id})
        .returning('*');
}
module.exports = { get_favorite_id };