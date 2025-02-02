
import { useState, useEffect } from "react";
import { useAuth } from "./AUthContext";

const ProtectedRoute = ({children}) => {

        const { isAuth, login, logout} = useAuth();
        const [ error, setError] = useState('');
        
        useEffect(() => {
            const checkAuth = async() => {
                try {
                    const response = await fetch('http://localhost:5000/users/dashboard',{
                        method: 'GET',
                        credentials: 'include',
                    });
                    console.log(response);
                    const data = await response.json();
                    console.log('response data: ', data);
                    if (response.ok){
                        login();
                        console.log('user authenticated', data.user);
                    } else {
                        logout();
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

            return isAuth ? children : <div>You need to login to access this page.</div>
    };

    export default ProtectedRoute;
