const { Configuration } = require('openai');
const { OpenAIApi } = require('openai');
const fs = require("fs");
const path = require('path');
const { parse } = require('path');
const url = require("url");
const axios = require('axios');
const multer = require('multer')
const storage = multer.memoryStorage();
// const upload = multer({storage})
const dotenv = require('dotenv')
dotenv.config()



const generate_ai_recipe = async (params) => {
    const OPEN_AI_KEY = process.env.OPEN_AI_KEY
    const configuration = new Configuration({
        apiKey: OPEN_AI_KEY
    });
    
    const open_ai = new OpenAIApi(configuration);
    const messages = [];
    let equipment_line = '';
    // console.log(params.equipment_restrictions);
    if (params.equipment_restrictions != '') {
        equipment_line = `I don't have ${params.equipment_restrictions}`
    }
    // I need dish_ingridients, equipment, instructions to be an array of objects, like this:
    // [{},{}].

    messages.push({
        role: "assistant",
        content: `I have only ${params.ingredients_ai}. 
            PLEASE NOTE: YOU CAN'T USE ANY OTHER INGREDIENTS.
            Create a recipe using only those ingredients. 
            How much time will it take to cook?
            ${equipment_line}
            Create a title for this dish.
            Try to include as much ingredients in the title as possible.
            What equipment will I need to use?
            Write every step without numbers, for temperature and weights use metric system.
            Generate random 10 digit dish_id starting with 0
            Respond with a json, like this template:
            {
                dish_id,
                dish_title,
                dish_prep_time,
                dish_ingridients: [],
                equipment: [],
                instructions: []
            }
        `
    })

    try {
        const completion = await open_ai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: messages
        })
        console.log(completion);
        const completion_text = completion.data.choices[0].message.content;
        const dish_AI_title_for_picture = JSON.parse(completion_text).dish_title;
        console.log(dish_AI_title_for_picture);
        // const dish_AI_ingredients_for_picture = JSON.parse(completion_text).dish_ingredients;
        // console.log("string with ingredients for the picture: ",dish_AI_ingredients_for_picture);
        const completion_image = await open_ai.createImage({
            prompt: dish_AI_title_for_picture,
            n: 1,
            size: '1024x1024'
        })
        const image_url = completion_image.data.data[0].url
        console.log(`my generated image - `,image_url);
        const parsed = url.parse(image_url);
        const img = path.basename(parsed.pathname);
        const save_directory = "./images";
        const imgPath = path.join(save_directory, img);

            // ⬇️ saving the image for uploading to AWS s3 bucket (to be done later)
        // const save = require('../images')

        // axios.get(image_url, { responseType: "stream" })
        //     .then(res => {
        //         res.data.pipe(fs.createWriteStream(imgPath))
        //     })
        //     .catch(e => { console.log(e); })


        // console.log('the original response from AI',JSON.parse(completion_text).dish_title);
        // console.log("imgPath: ", imgPath);
        // console.log("img: ", img);
        // console.log("imgPath: ", imgPath);
        // return {completion_text,image_url}
            // ⬆️ saving the image for uploading to AWS s3 bucket (to be done later)
        return [completion_text,image_url]
    }
   
    catch (e) { console.log(e); }

};
module.exports = generate_ai_recipe;


