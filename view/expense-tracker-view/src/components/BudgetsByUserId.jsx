import { useContext, useState, useEffect } from "react"
import { AuthContext } from "./protected/auth/AuthContext"


const BudgetsByUserId = () => {

    const { userId } = useContext(AuthContext);
    const [ budgets, setBudgets ] = useState([]);
    useEffect(() => {
        const getBudgets = async () => {
            try{
                const response = await fetch(`http://localhost:5000/budgets/${userId}`, {
                    method: 'GET',
                    credentials: 'include',
                });
                if(response.ok){
                    const data = await response.json();
                    setBudgets(data.budgets);
                    // console.log('response data:', data);
                    console.log('budgets:', budgets);
                }
            } catch(err){
                console.error('Error fetching budgets', err);
            }
        }
        getBudgets();
    }, [userId]);

    const getCategoryName = (categoryId) => {
        switch (categoryId) {
            case 1: return "Groceries";
            case 2: return "Utilities";
            case 3: return "Transportation";
            case 4: return "Housing";
            case 5: return "Healthcare";
            case 6: return "Personal Care";
            case 7: return "Insurances";
            case 8: return "Entertainment";
            default: return "Unknown"; 
        }
    };

    const handleDelete = async (budgetId) => {
        try{
        const response = await fetch(`http://localhost:5000/budgets/${budgetId}`, {
            method: "DELETE",
            credentials: "include",
        });

        if(response.ok){
            setBudgets((prevBudgets) => prevBudgets.filter((budget)=> budget.budget_id !== budgetId));
            console.log("Deleted budget with ID: " + budgetId);
        } else {
            console.error("Failed to delete budget");
        }
            }catch(err){
            console.error("Error deleting budget", err);
        }

    };

    return (
        <>
    
             <h3>Your budgets:</h3>
                {budgets.length > 0 ? (
                    budgets.map((budget, index) => (
                        <div key={index} style={{
                            border: "1px solid #ccc",
                            padding: "10px",
                            marginBottom: "10px",
                            borderRadius: "5px"
                        }}>
                            <h4>Category: {getCategoryName(budget.category_id)}</h4>
                            <p>Amount: {budget.amount}</p>
                            <p>Start Date: {new Date(budget.start_date).toLocaleDateString()}</p>
                            <p>Days left: {(new Date(budget.end_date) - new Date(budget.start_date)) / (1000 * 60 * 60 * 24)} days</p>
                            <button>Edit</button>
                            <button onClick={() => handleDelete(budget.budget_id)}>Delete</button>
                        </div>
                    ))
                ) : (<p>No budgets found</p>)}
            
        </>
    )
};

export default BudgetsByUserId;