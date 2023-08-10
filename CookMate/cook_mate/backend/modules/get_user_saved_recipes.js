const { db } = require('../config/db_SQL')


const get_user_saved_recipes = async (user_id) => {
    try {
        const favorites = await db('favorites')
            .join('users_favorites_connection', 'favorites.favorite_id', 'users_favorites_connection.favorite_id')
            .select('favorites.*')
            .where('users_favorites_connection.id', user_id);

        return favorites;
    } catch (error) {
        console.error('Error retrieving favorites:', error);
        throw error;
    }
}

module.exports = {get_user_saved_recipes}