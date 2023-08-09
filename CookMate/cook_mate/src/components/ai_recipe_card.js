import React from "react";
// const {Save_recipe_to_favorites}  =require('../../backend/modules/save_recipe_to_favorites');

const AI_RECIPE_CARD = (card) => {
    console.log(card);
    // const cards_array = cards.cards.cards.cards_result;

    console.log("AI data for card", card.card[0]);
    const dish = card.card[0];
    // console.log(cards.cards.response_cards.cards.cards_result);
    // console.log(recipies_arr);
    return (
        <div className="recipe-card">
            <div key={dish.dish_id}>
                <h4>{dish.dish_title}</h4>
                <img className="dish-image" src={dish.dish_image} alt="no image" />
                <p>Cooking time: {dish.dish_prep_time} minutes</p>
            </div>
            <div>
                <ul className="instructions-list">{dish.instructions.instructions.map((step) => (
                    <li>{step}</li>
                ))}
                </ul>
            </div>
            <div>
                <p>Ingridients:</p>
                <ul className="ingredients-list">{dish.dish_ingridients.map((ingridient) => (
                    <li>{ingridient}</li>
                ))}
                </ul>
            </div>
            <div>
                {dish.equipment.length > 0 && (
                    <div>
                        <p>You will need:</p>
                        <ul className="equipment-list">
                            {dish.equipment.map((equipment) => (
                                <li>{equipment}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            {/* <button  onClick={() => Save_recipe_to_favorites(dish)}> Save</button> */}
        </div>
        // <div className="recipe-card">
        //     <div key={dish.dish_id}>
        //         <h4>{dish.dish_title}</h4>
        //         <img className="dish-image" src={dish.dish_image} alt="no image" />
        //         <p>Cooking time: {dish.dish_prep_time} minutes</p>
        //     </div>
        //     <div>
        //         <ul className="instructions-list">
        //             {dish.instructions.instructions.map((step, index) => (
        //                 <li key={index}>{step}</li>
        //             ))}
        //         </ul>
        //     </div>
        //     <div>
        //         <p>Ingredients:</p>
        //         <ul className="ingredients-list">
        //             {dish.dish_ingredients.map((ingredient, index) => (
        //                 <li key={index}>{ingredient}</li>
        //             ))}
        //         </ul>
        //     </div>
        //     <div>
        //         {dish.equipment.length > 0 && (
        //             <div>
        //                 <p>You will need:</p>
        //                 <ul className="equipment-list">
        //                     {dish.equipment.map((equipment, index) => (
        //                         <li key={index}>{equipment}</li>
        //                     ))}
        //                 </ul>
        //             </div>
        //         )}
        //     </div>
        // </div>
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
