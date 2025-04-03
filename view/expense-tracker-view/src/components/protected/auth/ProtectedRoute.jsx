
import { useState, useEffect, useContext} from "react";
import { AuthContext } from "./AuthContext";
import styles from "../../css-modules/ProtectedRoute.module.css";


const ProtectedRoute = ({children}) => {

        const { isAuth, login, logout, userId, setUserId} = useContext(AuthContext);
        const [ error, setError] = useState('');
        const [ usernameSession, setUsernameSession ] = useState('');
        
        useEffect(() => {
            const checkAuth = async() => {
                try {
                    const response = await fetch('http://localhost:5000/users/dashboard',{
                        method: 'GET',
                        credentials: 'include',
                    });
                    // console.log(response);
                    const data = await response.json();
                    console.log('response data: ', data);
                    // console.log('user authenticated: ', data.info.username);
                    if (response.ok){
                        setUsernameSession(data.user.username);
                        setUserId(data.user.user_id);
                        console.log(userId);
                        login();
                    }
                } catch(err){
                    console.error('Error logging in.', err);
                    setError(err);
                };
                
            };
            checkAuth();
        },[login, logout]);
        
            if(error){
                return  <div>
                            <p>Error: {error}</p>
                        </div>
            };

            return isAuth ? (
                <div className={styles.mainDiv}>
                  <div className={styles.h1Div}>
                    <h1 className={styles.userH1}>Hello! 👋 {usernameSession}</h1>
                  </div>
                    {children}
                </div>
            ) : <div>You need to login to access this page.</div>
    };

    export default ProtectedRoute;
