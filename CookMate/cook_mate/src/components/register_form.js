import { useState } from "react";

function Register_form(props) {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user_exists, setUser_exists] = useState(false);
    const handle_register = async (e) => {
        e.preventDefault();
        setUser_exists(false);
        console.log('pressed');
        const request_options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                username,
                password
            })
        };
        try {
            console.log('req db send');
            const response = await fetch('http://localhost:3030/register', request_options);
            console.log('res from db:');
            const data = await response.json();

            console.log('Received data:', data);
            alert(data.message)
            props.toggle()
        } catch (error) {
            setUser_exists(true);
            alert(error.message)
            console.log('registration_form error is: ', error);
        }

        // Code to handle login goes here
        props.toggle()
    };

    return (
        <div className="popup">
            <div className="popup-inner">
                <h2>Register</h2>
                <form onSubmit={handle_register}>
                    {user_exists && <p className="error-message">Sorry, this Username or Email already exist</p>}
                    <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
                    <input type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
                    <input type="text" placeholder="password" value={password} onChange={e => setPassword(e.target.value.toString())} />

                    <button type="submit">Register</button>
                </form>
                <button onClick={props.toggle}>Close</button>
            </div>
        </div>
    )
}
export default Register_form;