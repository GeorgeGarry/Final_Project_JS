const { db } = require('../config/db_SQL')


const delete_from_favorites = async (props) => {
    id = props.user_id;
    favorite_id = props.favorite_id;
    await db('users_favorites_connection')
        .where('id', id)
        .where('favorite_id', favorite_id)
        .del();
    return {message:"recipe deleted succesfully"}

}

module.exports = { delete_from_favorites }