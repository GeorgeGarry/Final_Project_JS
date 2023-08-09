import { useState } from "react"

const Login_form = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault()
        // Code to handle login goes here
        // props.toggle()
        const request_options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username,
                password
            })
        };
        try {
            console.log('req db send login');
            const response = await fetch('http://localhost:3030/login', request_options);
            console.log('res from db login:');
            const data = await response.json();
            console.log("my data = ",data);
            console.log("my responce.status = ",response.status);



            if (response.status == 200){
                // alert("logged in succesfully")
                props.toggle()
            }
            else{
                alert("Sorry. Username or password is incorrect")
            }
            console.log('Received data login:', data);
            props.user_logged_in(data.resp[0])
            // res.status(200).json({ message: 'Data sent successfully' });
        } catch (error) {
            // alert("sorry, this email or username already exist")
            console.log('Login_form error is: ', error);
        }
    }

    return (
        <div className="popup">
            <div className="popup-inner">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <label>
                        Username:
                        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                    </label>
                    <label>
                        Password:
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    </label>
                    <button type="submit">Login</button>
                </form>
                <button onClick={props.toggle}>Close</button>
            </div>
        </div>
    )
}
export default Login_form;