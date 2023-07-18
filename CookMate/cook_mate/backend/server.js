const express = require('express');
const app = express();
const send_API_request = require('./modules/request_API')
const return_recipe_card_data_to_front = require('./modules/return_recipe_card_data_to_front')
const Register_new_user = require('./modules/register_new_user');
const generate_ai_recipe = require('./modules/generate_ai_recipe');
const { db } = require('../config/db_SQL.js')


app.use(express.json()); // Parse request body as JSON

app.post('/', (req, res) => {

    console.log('request recieved');
    // const { dish_type, dish_name, cook_time, meal_type, cuisine } = req.body;
    send_API_request(req.body)
        .then(api_resp => { return return_recipe_card_data_to_front(api_resp) })
        .then(cards => {
            console.log(cards);
            res.json({ message: 'Data received successfully', cards })
        })
        .catch(err => console.log(err))
});

app.post('/register', async (req, res) => {
    console.log('registration request recieved');
    // Register_new_user(req.body);
    // res.json(Register_new_user(req.body));
    try {
        const test_tmp = await db('users')
            .insert({ email: "george@gmail.com", username: 'george', passord: "123test" })
            .returning("*")
        res.json(test_tmp);
    }
    catch (err) {
        console.log(`db without function error:` + err);
    }


});


app.get('/', (req, res) => {
    console.log('request received');
    generate_ai_recipe(req.query)
        .then(resp_AI => { return return_recipe_card_data_to_front(resp_AI,true)})
        .then(cards => { 
            // console.log("response on the server:",cards);
            res.json({ message: 'Data received successfully', cards })
        })
        .catch(err => console.log(err))

})

const port = 3030;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});