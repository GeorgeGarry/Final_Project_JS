import Login_form from "./login_form";
import { useState } from "react";
function Login_button() {
    const [seen, setSeen] = useState(false);

    function togglePop () {
        setSeen(!seen);
    };

    return (
        <div>
            <button onClick={togglePop}>Login</button>
            {seen ? <Login_form toggle={togglePop} /> : null}
        </div>
    )
}
export default Login_button