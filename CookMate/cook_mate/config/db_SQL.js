const knex = require(`knex`);
const dotnev = require(`dotenv`);
dotnev.config();
const db = knex({
    client:`pg`,
    connection: {
        host: process.env.DB_HOST,  
        port: process.env.DB_PORT, 
        user: process.env.DB_USER, 
        password: process.env.DB_PASS, 
        database:process.env.DB_NAME
    //     host: 'trumpet.db.elephantsql.com',  
    //     port: '5432', 
    //     user: 'ttcarjvr', 
    //     password: 'hkO7SR72IT8jWahxtygUKj4ukoPm0K4P', 
    //     database:'ttcarjvr'  
    }
});
module.exports={
    db
}

