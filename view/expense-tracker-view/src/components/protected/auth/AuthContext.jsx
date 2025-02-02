
import { createContext ,useContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [ isAuth, setIsAuth ] = useState(false);

    const login = () => {
            setIsAuth(true);
        };

    const logout = () => {
        setIsAuth(false);
        window.location.href = '/'
    }

    return (
        <AuthContext.Provider value = {{ isAuth, login, logout}}>
            {children}
        </ AuthContext.Provider> 
        )
    };

    const useAuth = () => {
        return useContext(AuthContext);
    };

    export { AuthProvider, useAuth};

