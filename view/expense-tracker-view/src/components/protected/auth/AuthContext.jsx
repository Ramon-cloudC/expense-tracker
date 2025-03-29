
import { createContext ,useContext, useState} from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [ isAuth, setIsAuth ] = useState(false);
    const [ userId, setUserId] = useState('');

    const login = () => {
            setIsAuth(true);
        };

    const logout = async () => {
        try{
            const response = await fetch("http://localhost:5000/users/logout",{
                method: 'GET',
                credentials: 'include',
            });
            
            const data = await response.json();
            if(response.ok){
                console.log(data);
                setIsAuth(false);
            }
        } catch(err){
            console.error(`Couldn't logout the session`);
        }

    };

    return (
        <AuthContext.Provider value = {{ isAuth, login, logout, userId, setUserId}}>
            {children}
        </ AuthContext.Provider> 
        )
    };

    const useAuth = () => {
        return useContext(AuthContext);
    };

    export { AuthProvider, useAuth, AuthContext };

