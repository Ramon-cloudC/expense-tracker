
import { useAuth } from "./auth/AUthContext";
import Budget from "../Budget";

const Dashboard = () => {

    const { logout } = useAuth();
    const handleLogout = () => {
        logout();
    }
    return (

        <>
            <h1>Welcome back! </h1>
            <div>
                <h3>Your current dashboard</h3>
            </div>
            <Budget />
            <button onClick={handleLogout}>Logout</button>
        </>
    )
};

export default Dashboard;