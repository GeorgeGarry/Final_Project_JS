import { useEffect, useState } from "react";
import axios from "axios";
import Recipe_card from "./recipe_card";

const Favorites_page = (props) => {
    const [favorites, setFavorites] = useState([]);
    const [received_response, setReceived_response] = useState(false);

    console.log(props);
    const user_id = props.user_id
    const url = 'https://cookmate.onrender.com/favorites'
    console.log(user_id);
    useEffect(() => {
        const fetch_for_user_favorites = async () => {
            try {
                const response = await axios.get(url, { params: { user_id } });
                console.log("got favorites on favorite_page: ", response);
                setFavorites(response);
                
                setReceived_response(true)
            } catch (error) {
                console.error('Error fetching favorites:', error);
            }
        };

        fetch_for_user_favorites();
    }, [user_id]);

    console.log("favorites: ", favorites);

    return (
        <div>
            <h3>Here's your saved recipies:</h3>
           {received_response && <Recipe_card cards={favorites.data} user_id={user_id} favorites={true}/>}
        </div>

    )
}
export default Favorites_page

