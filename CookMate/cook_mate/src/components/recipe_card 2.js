import React from "react";
import { Save_recipe_to_favorites } from "../modules/save_recipe_to_favorites";
// const Save_recipe_to_favorites  =require('../../backend/modules/save_recipe_to_favorites');

const Recipe_card = (props) => {
    const user_id = props.user_id
    console.log(user_id);
    // console.log("logged in user, in Recipe_card ", user_id);
    const send_recipe_to_serber_db = async (dish_card) =>{
        console.log("we clicked save button");
        const dish = dish_card;
        console.log('our dish:', dish);
        const request_options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                dish,
                user_id
            })
        };
        try {
            console.log('req db send_recipe_to_serber_db');
            const response = await fetch('http://localhost:3030/save_favorite', request_options);
            console.log('res from db send_recipe_to_serber_db:');
            const data = await response.json();

            console.log('Received data  send_recipe_to_serber_db:', data);
            // res.status(200).json({ message: 'Data sent successfully' });
        } catch (error) {
            
            console.log('send_recipe_to_serber_db error is: ', error);
        }
    }

    const cards_array = props.cards.cards.cards_result;

    console.log(cards_array);
    // console.log(cards.cards.response_cards.cards.cards_result);
    // console.log(recipies_arr);
    return (
        <div className="recipe-container">
            {cards_array.map((dish) => (
                <div className="recipe-card">
                    <div key={dish.dish_id}>
                        <div>
                            <h4 className="dish-title">{dish.dish_title}</h4>
                            <img className="dish-image" src={dish.dish_image} />
                            <p className="cooking-time">Cooking time: {dish.dish_prep_time} minutes</p>
                        </div>
                        <div>
                            <ul className="instructions-list">{dish.instructions.map((step) => (
                                <li>{step}</li>
                            ))}
                            </ul>
                        </div>
                        <div>
                            <p className="ingredients-heading">Ingridients:</p>
                            <ul className="ingredients-list">{dish.dish_ingridients.map((ingridient) => (
                                <li>{ingridient.ingridient_name}</li>
                            ))}
                            </ul>
                        </div>
                        <div>
                            {dish.equipment.length > 0 && (
                                <div>
                                    <p className="equipment-heading">You will need:</p>
                                    <ul className="equipment-list">
                                        {dish.equipment.map((equipment) => (
                                            <li>{equipment.equipment_name}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                    </div>
                    <button  onClick={() => Save_recipe_to_favorites(dish)}>Save to favorites</button>
                </div>
                
            ))}
        </div>
        // <div className="recipe-container">
        //     {cards_array.map((dish) => (
        //         <div className="recipe-card" key={dish.dish_id}>
        //             <div>
        //                 <h4 className="dish-title">{dish.dish_title}</h4>
        //                 <img className="dish-image" src={dish.dish_image} alt="dish" />
        //                 <p className="cooking-time">Cooking time: {dish.dish_prep_time} minutes</p>
        //             </div>
        //             <div>
        //                 <ul className="instructions-list">
        //                     {dish.instructions.map((step, index) => (
        //                         <li key={index}>{step}</li>
        //                     ))}
        //                 </ul>
        //             </div>
        //             <div>
        //                 <p className="ingredients-heading">Ingredients:</p>
        //                 <ul className="ingredients-list">
        //                     {dish.dish_ingredients.map((ingredient, index) => (
        //                         <li key={index}>{ingredient.ingredient_name}</li>
        //                     ))}
        //                 </ul>
        //             </div>
        //             <div>
        //                 {dish.equipment.length > 0 && (
        //                     <div>
        //                         <p className="equipment-heading">You will need:</p>
        //                         <ul className="equipment-list">
        //                             {dish.equipment.map((equipment, index) => (
        //                                 <li key={index}>{equipment.equipment_name}</li>
        //                             ))}
        //                         </ul>
        //                     </div>
        //                 )}
        //             </div>
        //         </div>
        //     ))}
        // </div>


    )
}
export default Recipe_card

// dish_id
// : 
// 158902
// dish_image
// : 
// "https://spoonacular.com/recipeImages/158902-312x231.jpg"
// dish_ingridients
// : 
// (3) [{…}, {…}, {…}]
// dish_prep_time
// : 
// 25
// dish_title
// : 
// "Gluten-Free Sausage Cheese Balls"
// equipment
// : 
// (3) [{…}, {…}, {…}]
// instructions
// : 
// (5) ['Heat oven 