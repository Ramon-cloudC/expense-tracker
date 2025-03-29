
import { useState} from "react";   
import { useNavigate } from "react-router-dom";
import styles from "./css-modules/Login.module.css";

const Login = () => {

const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState('');
const navigate = useNavigate();

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

const registerRedirect = () => {
    navigate("/register");  
};

    return (
        <>
            <div className={styles.mainDiv}>
                <h2 className={styles.loginTitle}>Login</h2>
                <form className={styles.form} onSubmit={handleSubmit}>
                  <div className={styles.subformDiv}>
                    <input 
                        type="text"
                        className={styles.input}   
                        value={username}
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>  
                  <div className={styles.subformDiv}>
                    <input
                        type="password"
                        className={styles.input}
                        value={password}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>  
                    {error && <p style={{color: "red", fontSize: "0.8rem"}}>{error}</p>}
                    <button className={styles.button} type="submit">Sign In</button><br/>
                </form>
                <h4 className={styles.h4}>OR</h4>
                <button className={styles.button} onClick={registerRedirect}>Register</button>
            </div>
        </>
    )
};

export default Login;