import React from "react";

const Recipe_card = (props) => {
    const user_id = props.user_id
    let cards_array
    let favorite_id
    if (props.favorites) {
        cards_array = props.cards.dish_cards_arr;
        console.log("favorites cards array on recipe_card", cards_array);
    }
    else {
        cards_array = props.cards.cards.cards_result;
    }
    console.log(user_id);
    console.log("logged in user, in Recipe_card ", user_id);

    const send_data_to_delete_from_favorites = async (dish_card) => {
        try {
            console.log("we clicked delete button");
            const favorite_id = dish_card.favorite_id
            const request_options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id,
                    favorite_id
                })
            }

            // console.log(request_options);
            const response = await fetch('https://cookmate.onrender.com/delete_favorite', request_options);
            // console.log('res from db delete favorite: ', response);
            const data = await response.json();
            // console.log('Received data from delete_favorite:', data);
            alert(data.message)
        }
        catch (err) {
            console.log("deleting error:", err);
        }
    }

    const send_recipe_to_server_db = async (dish_card) => {
        try {
            // console.log("we clicked save button");
            const dish = dish_card;
            // console.log('our dish:', dish);
            const request_options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    dish,
                    user_id
                })
            };

            const response = await fetch('https://cookmate.onrender.com/save_favorite', request_options);
            // console.log('res from db send_recipe_to_serber_db: ', response);
            const data = await response.json();
            // console.log('Received data  send_recipe_to_serber_db:', data);
            alert(data.message)

        } catch (error) {

            console.log('send_recipe_to_serber_db error is: ', error);
        }
    }
    // console.log(cards_array);

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
                    {user_id != "" && !props.favorites && <button onClick={() => send_recipe_to_server_db(dish)}>Save to favorites</button>}
                    {props.favorites && <button onClick={() => send_data_to_delete_from_favorites(dish)}>Remove from favorites</button>}
                </div>

            ))}
        </div>

    )
}
export default Recipe_card
