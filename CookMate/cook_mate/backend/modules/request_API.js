const axios = require('axios');

const send_API_request = async (parameters) => {
    function get_random_ids(res_length, results_on_page) {
        const random_numbers = new Set();
        const number_of_results = parseInt(results_on_page);
      
        while (random_numbers.size < number_of_results) {
          const random_num = Math.floor(Math.random() * res_length);
          random_numbers.add(random_num);
        }
      
        return Array.from(random_numbers);
      }
    let display_ids=[];
    let display_objects_select=[];
    const options = {
        method: "GET",
        url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch",
        params: {
            query: parameters.dish_type,
            cuisine: parameters.cuisine,
            diet: "",
            equipment: "",
            includeIngredients: parameters.add_food,
            excludeIngredients: parameters.exclude_food,
            type: parameters.dish_type,
            instructionsRequired: "true",
            fillIngredients: "true",
            addRecipeInformation: "true",
            titleMatch: parameters.dish_name,
            maxReadyTime: parameters.cook_time,
            ignorePantry: "true",
            sort: "calories",
            sortDirection: "asc",
            offset: "0",
            number: "100",
            limitLicense: "false",
            ranking: "2"
            
        },
        headers: {
            "X-RapidAPI-Key": "27ffa4af19mshebbc84d4c789642p1dbda0jsnfd8637064c9c",
            "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
            
        },
    };

    try {
        const response = await axios.request(options);
        // console.log(response.data.results);
        if (response.data.results.length >= 5) {
            display_ids = get_random_ids(response.data.results.length, parameters.results_number);
        } else {
            display_ids = response.data.results.map((item, index) => index);
        }
        display_objects_select = display_ids.map(
            (id) => response.data.results[id]
        );
        return(display_objects_select)
        // display_results(display_objects_select);
    } catch (error) {
        console.error(error);
    }
    
}
module.exports = send_API_request;
