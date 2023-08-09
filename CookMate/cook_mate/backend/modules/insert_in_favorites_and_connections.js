const { db } = require('../config/db_SQL');

const insert_in_favorites_and_connections = async (user_id, dish_id, dish_title, dish_image, dish_prep_time, dish_ingridients, equipment, instructions) => {
    try {
        await db.transaction(async (trx) => {
            const newFavorite = await trx('favorites')
                .insert({
                    dish_id,
                    title: dish_title,
                    image: dish_image,
                    cooking_time: dish_prep_time,
                    ingredients: dish_ingridients,
                    equipments: equipment,
                    instructions: instructions,
                })
                .returning('*');

            const newFavoriteId = newFavorite[0].favorite_id;

            await trx('users_favorites_connection')
                .insert({
                    id: user_id,
                    favorite_id: newFavoriteId
                });
        });

        console.log('Insert successful');
    } catch (error) {
        console.error('Error inserting data:', error);
    }
};

module.exports = { insert_in_favorites_and_connections };