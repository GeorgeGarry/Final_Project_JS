import AI_recipe_page from "./ai_recipe_page";
import { useState } from "react";
const  AI_page_button = () => {
    const [seen, setSeen] = useState(false);

    function togglePop () {
        setSeen(!seen);
    };

    return (
        <div>
            <button onClick={togglePop}>AI recipe</button>
            {seen ? <AI_recipe_page/> : null}
        </div>
    )
}
export default AI_page_button