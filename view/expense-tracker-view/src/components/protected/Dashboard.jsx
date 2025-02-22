
import { useContext } from "react";
import { AuthContext} from "./auth/AuthContext";
import CreateBudget from "../CreateBudget";

const Dashboard = () => {

    const { logout } = useContext(AuthContext);
    const handleLogout = () => {
        logout();
    }
    return (

        <>
            
            <div>
                <h3>Your current dashboard</h3>
            </div>
            <CreateBudget />
            <button onClick={handleLogout}>Logout</button>
        </>
    )
};

export default Dashboard;