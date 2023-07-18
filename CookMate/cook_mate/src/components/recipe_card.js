import React from "react";


const Recipe_card = (cards) => {

    const cards_array = cards.cards.cards.cards_result;

    console.log(cards_array);
    // console.log(cards.cards.response_cards.cards.cards_result);
    // console.log(recipies_arr);
    return (
        <div className="recipe-card">
            {cards_array.map((dish) => (
                <div key={dish.dish_id}>
                    <div>
                        <h4>{dish.dish_title}</h4>
                        <img src={dish.dish_image} />
                        <p>Cooking time: {dish.dish_prep_time} minutes</p>
                    </div>
                    <div>
                        <ul>{dish.instructions.map((step) => (
                            <li>{step}</li>
                        ))}
                        </ul>
                    </div>
                    <div>
                        <p>Ingridients:</p>
                        <ul>{dish.dish_ingridients.map((ingridient) => (
                            <li>{ingridient.ingridient_name}</li>
                        ))}
                        </ul>
                    </div>
                    <div>
                        {dish.equipment.length > 0 && (
                            <div>
                                <p>You will need:</p>
                                <ul>
                                    {dish.equipment.map((equipment) => (
                                        <li>{equipment.equipment_name}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                </div>
            ))}
        </div>
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