import { useState } from "react";
import axios from "axios";
import React from "react";
import AI_RECIPE_CARD from "./ai_recipe_card";
import '../ai_recipe_card.css';
import ErrorBoundary from "../ErrorBoundary";


const AI_recipe_page = () => {
    // const image_name="img-OSreKdkUwP46cJjBEzlNFVBq.png"
    // const image_path="CookMate/cook_mate/src/components/img-OSreKdkUwP46cJjBEzlNFVBq.png"

    const url = 'http://localhost:3030';
    const [ingredients_ai, setIngregirnts_ai] = useState('');
    const [equipment_restrictions, setEquipment_restrictions] = useState('');
    const [response_cards, setReponse_cards] = useState('');
    const [received_response_AI, setReceived_response_AI] = useState(false)

    const send_ai_request = async (e) => {
        e.preventDefault()
        try {
            setReceived_response_AI(false);
            console.log('request sent to the backend');
            const response = await axios.get(url, { params: { ingredients_ai, equipment_restrictions } });
            // console.log(response);
            // const data =  await response.json();
            // console.log('resp received: ',response.data.cards);
            setReponse_cards(response.data.cards.cards_result);
            // console.log(`response_cards to pass to the AI_RECIPE_CARD:`,response_cards);
            setReceived_response_AI(true);
            // return response.data

            // console.log(`here is responce frontEnd:`+ data);
        }
        catch {

        }
    }
    return (
        <div>
            <form onSubmit={(e) => send_ai_request(e)}>
                Ingredients:
                <input type="text" onChange={(e) => setIngregirnts_ai(e.target.value)} placeholder="Example: tomatoes, fish, eggs" />
                Equipment restrictions:
                <input type="text" onChange={(e) => setEquipment_restrictions(e.target.value)} placeholder="Example: microwave, oven" />
                <input type="submit" value={`Create recipe!`} />
            </form>
            {received_response_AI &&
            
                <ErrorBoundary>
                    <AI_RECIPE_CARD card={response_cards} />
                </ErrorBoundary>
            }
            {/* {received_response_AI &&
            
            <ErrorBoundary>
                <div className="popup" > loading...</div>
            </ErrorBoundary>
        } */}
       
        </div>

    )
}





export default AI_recipe_page;