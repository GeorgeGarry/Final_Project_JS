const express = require('express');
const app = express();
const path = require('path')
const send_API_request = require('./modules/request_API')
const return_recipe_card_data_to_front = require('./modules/return_recipe_card_data_to_front')
const Register_new_user = require('./modules/register_new_user');
const generate_ai_recipe = require('./modules/generate_ai_recipe');
const Login = require('./modules/login')
const { Save_recipe_to_favorites } = require('./modules/save_recipe_to_favorites')
const { get_user_saved_recipes } = require('./modules/get_user_saved_recipes')
const { parse_db_recipe_data } = require('./modules/parse_db_recipe_data')
const { delete_from_favorites } = require('./modules/delete_from_favorites')



app.use(express.json()); // Parse request body as JSON

app.post('/', (req, res) => {

    console.log('request recieved');
    send_API_request(req.body)
        .then(api_resp => { return return_recipe_card_data_to_front(api_resp) })
        .then(cards => {
            console.log(cards);
            res.json({ message: 'Data received successfully', cards })
        })
        .catch(err => console.log(err))
});

app.post('/register', async (req, res) => {
    console.log('registration request recieved', req.body);

    try {
        const register_try = Register_new_user(req.body);
        register_try.then(res => console.log('register try:', res))
        res.json({ message: "Registered succesfully! welcome!" })
    }
    catch (err) {
        console.log(`server error: `, err);
        res.json({ message: "Sorry, this username or email is already taken!" });
    }
});

app.post('/login', async (req, res) => {
    console.log('login request recieved', req.body);

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
    try {
        const save_recipe_try = Save_recipe_to_favorites(req.body);
        console.log("line 77 server.js: ", save_recipe_try);
        const resp = await save_recipe_try
        res.json({ message: resp.message });
    }
    catch (err) {
        console.log(`server error: `, err);
        res(err);
    }
})

app.post('/delete_favorite', async (req, res) => {
    console.log("server deliting favorite", req.body);
    try {
        const delete_favorite_try = delete_from_favorites(req.body)

        const resp = await delete_favorite_try
        console.log(delete_favorite_try);
        res.json({ message: resp.message });
    }
    catch (err) {
        console.log(`server error delete_favorite: `, err);
        res(err);
    }
})


app.get('/favorites', async (req, res) => {
    console.log("request received: ", req.query);
    try {
        const saved_dishes = await get_user_saved_recipes(req.query.user_id)
        console.log('got saved dishes on the server: ');
        const dish_cards_arr = parse_db_recipe_data(saved_dishes)
        console.log("dish_cards_arr: ", dish_cards_arr);
        res.json({ message: 'favorites cards received successfully', dish_cards_arr })
    }
    catch (err) {
        console.log('server /favorites error: ', err);
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

// const port = 3030;
app.listen(process.env.PORT || 3001, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

app.use(express.static(path.join(__dirname, "/backend")));

app.get("*",(req,res) =>{
    res.sendFile(path.resolve(__dirname, "CookMate/cook_mate/public", "index.html"));
});