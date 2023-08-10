const { db } = require('../config/db_SQL')
const { get_favorite_id } = require('./get_favorite_id')
const { check_if_dish_exists_in_db } = require('./check_if_dish_exists_in_db')
const { check_if_dish_already_in_favorites } = require('./check_if_dish_already_in_favorites')
const {insert_in_favorites_and_connections} = require('./insert_in_favorites_and_connections')

const Save_recipe_to_favorites = async (body) => {
    const user_id = body.user_id;
    console.log('Save_recipe_to_favorites user id passed', user_id);

    try {
        const {
            dish_id,
            dish_title,
            dish_image,
            dish_prep_time,
            dish_ingridients,
            equipment,
            instructions
        } = body.dish;

        console.log("this is dish_id: ", dish_id);

        const db_dish_check = await check_if_dish_exists_in_db(dish_id);
        console.log("checkin the condition: ", db_dish_check.length);

        if (db_dish_check.length > 0) {
            console.log("this dish already exists in the DB");
            const favorite = await get_favorite_id(dish_id);
            console.log("getting the favorite resp from db", favorite);
            const favorite_id_db = favorite[0].favorite_id;
            console.log('got favorite', favorite_id_db);

            const check_connection_favorite_user_id = await check_if_dish_already_in_favorites(favorite_id_db);
            console.log("checking users_favorites_connection table: ", check_connection_favorite_user_id);

            if (check_connection_favorite_user_id.length > 0) {
                console.log("you have it in favorites already");
                return { message: "you have it in favorites already" };
            } else {
                console.log("you DON'T have it in favorites ");
                await db('users_favorites_connection').insert({
                    id: user_id,
                    favorite_id: favorite_id_db
                });

                return { message: "Recipe added to favorites successfully" };
            }
        } else {
            await insert_in_favorites_and_connections(user_id, dish_id, dish_title, dish_image, dish_prep_time, dish_ingridients, equipment, instructions);
            
            return { message: "Recipe added to favorites successfully" };
        }
    } catch (error) {
        console.log("Error in Save_recipe_to_favorites:", error);
        throw error; 
    }
};

module.exports = { Save_recipe_to_favorites };
