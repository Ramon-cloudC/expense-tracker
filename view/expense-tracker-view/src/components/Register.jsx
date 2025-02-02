
import { useState } from "react";


const Register = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!username || !email || !password ){
            alert("All fields are required.");
            return;
        };
            try{
                const response = await fetch("http://localhost:5000/users/add", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username,
                        email,
                        password,
                    })
                });

                if(response.ok){
                    alert('User successfully registered.');
                    setUsername('');
                    setEmail('');
                    setPassword('');
                    window.location.href = '/login';
                } else {
                    throw new Error('Failed to register user.');
                 }
                    
                } catch(err){
                    setError(err.message);
                }
             
    };

    return (
        <>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                 <label htmlFor="email">Email</label>
                <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="password">Password</label>
                <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Register</button>
            </form>
            
        </>
    )
};

export default Register;
