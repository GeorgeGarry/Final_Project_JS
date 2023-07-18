import { useState } from "react";

function Register_form(props) {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handle_register = async (e) => {
        e.preventDefault();
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
            const response = await fetch('http://localhost:3030/register', request_options);
            const data = await response.json();

            console.log('Received data:', data);
            // res.status(200).json({ message: 'Data sent successfully' });
        } catch (error) {
            console.log('error is: ', error);
            // Handle any errors that occur during the request
            // res.status(500).json({ error: 'An error occurred while sending the data' });
        }

        // Code to handle login goes here
        props.toggle()
    };

    return (
        <div className="popup">
            <div className="popup-inner">
                <h2>Login</h2>
                <form onSubmit={handle_register}>
                    
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