import Register_form from "./register_form";
import { useState } from "react";
function Register_button() {
    const [seen, setSeen] = useState(false);

    function togglePop () {
        setSeen(!seen);
    };

    return (
        <div>
            <button onClick={togglePop}>Register</button>
            {seen ? <Register_form toggle={togglePop} /> : null}
        </div>
    )
}
export default Register_button