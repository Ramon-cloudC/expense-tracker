
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./css-modules/Register.module.css"

const Register = () => {

    const navigate = useNavigate();
    const [ username, setUsername ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ errorMessage, setErrorMessage ] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!username || !email || !password ){
            setErrorMessage("All fields are required.");
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
                    navigate('/');
                } else {
                    throw new Error('Failed to register user.');
                 }
                    
                } catch(err){
                    setError(err.message);
                }
             
    };

    return (
        <div className={styles.mainDiv}>
          <div className={styles.h2Div}>
            <h2>Register</h2>
          </div>
          <div className={styles.formDiv}>
            <form className={styles.form} onSubmit={handleSubmit}>
                {/* <label htmlFor="username">Username</label> */}
                <input
                    type="text"
                    placeholder="Create Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                 {/* <label htmlFor="email">Email</label> */}
                <input 
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {/* <label htmlFor="password">Password</label> */}
                <input 
                    type="password"
                    placeholder="Create Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {errorMessage && <p style={{color: "red"}}>{errorMessage}</p>}
                <button type="submit">Sign Up</button>
            </form>
          </div>
          <button onClick={()=> navigate("/")}>Back</button>  
        </div>
    )
};

export default Register;
