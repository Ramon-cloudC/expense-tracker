
import { useState, useContext } from "react";
import { AuthContext} from "./auth/AuthContext";
import CreateBudget from "../CreateBudget";
import { useNavigate } from "react-router-dom";
import styles from "../css-modules/Dashboard.module.css";
import BudgetsByUserId from "../BudgetsByUserId"

const Dashboard = () => {

    const { logout,userId } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isClicked, setIsClicked] = useState(false);
    const [closeMessage, setCloseMessage] = useState("Close");
    console.log("This is the user ID: ", userId);


    const handleLogout = () => {
        logout();
        navigate("/");
    }

    const handleClick = (e) => {
        console.log(e.target.textContent);
        const buttonContent = e.target.textContent;
        setIsClicked(true);
        if(buttonContent === "Close"){
            setIsClicked(false);
        }
    }

    
    return (

        <>
            <div className={styles.mainDiv}> 
                <h3 className={styles.h3}>Your current dashboard</h3>
            </div>
            <button className={styles.createButton} onClick={(e)=> handleClick(e)}>
                {isClicked ? <h3>Close</h3> : <h3>Create Budget</h3>}
            </button>
            {isClicked ? <CreateBudget /> : null}
            
            {userId && <BudgetsByUserId/>}
            <button className={styles.logout} onClick={handleLogout}>Logout</button>
        </>
    )


};

export default Dashboard;