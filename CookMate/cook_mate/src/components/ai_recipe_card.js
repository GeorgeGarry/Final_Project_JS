import React from "react";


const AI_RECIPE_CARD = (card) => {
   
    // const cards_array = cards.cards.cards.cards_result;
    
    console.log("AI data for card", card.card[0]);
    const dish = card.card[0];
    // console.log(cards.cards.response_cards.cards.cards_result);
    // console.log(recipies_arr);
    return (
        <div className="recipe-card">
            <div key={dish.dish_id}>
            <h4>{dish.dish_title}</h4>
            <p>Cooking time: {dish.dish_prep_time} minutes</p>
            </div>
            <div>
                        <ul>{dish.instructions.instructions.map((step) => (
                            <li>{step}</li>
                        ))}
                        </ul>
                    </div>
            <div>
            <p>Ingridients:</p>
                    <ul>{dish.dish_ingridients.map((ingridient) => (
                        <li>{ingridient}</li>
                        ))}
                    </ul> 
            </div>
            <div>
            {dish.equipment.length > 0 && (
                            <div>
                                <p>You will need:</p>
                                <ul>
                                    {dish.equipment.map((equipment) => (
                                        <li>{equipment}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
            </div>
            <div></div>
            <div></div>

               
        </div>
    )
}
export default AI_RECIPE_CARD


// <div key={dish.dish_id}>
// <h4>{dish.dish_title}</h4>
// <img src={dish.dish_image}/>
// <p>Cooking time: {dish.dish_prep_time} minutes</p>
// <ul>{dish.instructions.map((step) => (
//     <li>{step}</li>
//     ))}
// </ul>
// <p>Ingridients:</p>
// <ul>{dish.dish_ingridients.map((ingridient) => (
//     <li>{ingridient.ingridient_name}</li>
//     ))}
// </ul> 
// {dish.equipment.length > 0 && (
//     <div>
//         <p>You will need:</p>
//         <ul>
//         {dish.equipment.map((equipment) => (
//             <li>{equipment.equipment_name}</li>
//         ))}
//         </ul>
//     </div>
//     )}


// </div>
