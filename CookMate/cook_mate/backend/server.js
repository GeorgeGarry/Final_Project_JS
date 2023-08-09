const express = require('express');
const app = express();
const send_API_request = require('./modules/request_API')
const return_recipe_card_data_to_front = require('./modules/return_recipe_card_data_to_front')
const Register_new_user = require('./modules/register_new_user');
const generate_ai_recipe = require('./modules/generate_ai_recipe');
const Login = require('./modules/login')
const { Save_recipe_to_favorites } = require('./modules/save_recipe_to_favorites')
// const { db } = require('./config/db_SQL.js')



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
    // console.log(req.body);
    console.log('registration request recieved', req.body);

    // res.json(Register_new_user(req.body));
    try {
        const register_try = Register_new_user(req.body);
        register_try.then(res => console.log('register try:', res))
    }
    catch (err) {
        console.log(`server error: `, err);
        res(error);
    }
});

app.post('/login', async (req, res) => {
    // console.log(req.body);
    console.log('login request recieved', req.body);

    // res.json(Register_new_user(req.body));
    try {
        const login_try = Login(req.body);

        login_try.then(resp => {
            if (resp.length > 0) {
                const message = "login succesfull"
                res.status(200).json({ message, resp })
                console.log({ message, resp });
            }
            else {
                res.status(400).json({ message: "unseccesfull login" })

            }
            console.log('trying to log in', res)
        })

    }
    catch (err) {
        console.log(`server error: `, err);
        res.status(400).json({ message: "unseccesfull login" })
    }
});

app.post('/save_favorite', async (req, res) => {
    console.log("server saving favorite", req.body);
    console.log("server saving favorite ingredients", req.body.dish.dish_ingridients[0]);
    // dish_ingridients
    try {
        const save_recipe_try =  Save_recipe_to_favorites(req.body);
        console.log("line 77 server.js: ", save_recipe_try);
        const resp = await save_recipe_try
        // console.log("responce on server.js line 79: ", {resp}.message);
        // res.json({ message: {resp}.message});
        res.json({ message: resp.message});
        // save_recipe_try.then(resp => {
        //     // console.log("responce on server.js line 79: ", resp);
        //     // if (resp.length > 0) {
        //     //     const message = "recipe saved"
        //     //     res.json({ message, resp })
        //     //     console.log({ message, resp });
        //     // }
        //     // console.log('trying save recipe', res)
        // })

    }
    catch (err) {
        console.log(`server error: `, err);
        res(err);
    }
    

})





app.get('/', (req, res) => {
    console.log('request received');
    generate_ai_recipe(req.query)
        .then(resp_AI => { return return_recipe_card_data_to_front(resp_AI, true) })
        .then(cards => {
            console.log("response on the server:", cards);
            res.json({ message: 'Data received successfully', cards })
        })
        .catch(err => console.log("server.js 107", err))

})

const port = 3030;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});