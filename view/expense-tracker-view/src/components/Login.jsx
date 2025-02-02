
import { useState } from "react";

const Login = () => {

const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState('');

const handleSubmit = async(e) => {
    e.preventDefault();

    if(!username || !password) {
        setError('Username and password required!')
    } else {
        console.log('Access granted');
        setError('');
    }

    try{
        const response = await fetch('http://localhost:5000/users/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password
            }),
            credentials: 'include',
        });
        
        if(!response.ok){
            alert('Error during login process.');
            return;
        } else {
            setUsername('');
            setPassword('');
            window.location.href = '/dashboard';
        }
    } catch(err){
        console.error({
            message: 'Error during login',
            err
        });
    }
};

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input 
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p style={{color: "red"}}>{error}</p>}
                <button type="submit">Submit</button>
            </form>
        </>
    )
};

export default Login;