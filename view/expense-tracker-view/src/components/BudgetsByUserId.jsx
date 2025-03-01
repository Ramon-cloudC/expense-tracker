import { useContext, useState, useEffect } from "react";
import { AuthContext } from "./protected/auth/AuthContext";
import { BudgetCategoryContext } from "./context/BudgetCategoryContext";
import AddExpenseForm from "./AddExpenseForm";

const BudgetsByUserId = () => {

    const { userId } = useContext(AuthContext);
    const { selectedCategory, setSelectedCategory } = useContext(BudgetCategoryContext);
    const [ selectedBudgetId, setSelectedBudgetId ] = useState(null);
    const [ budgets, setBudgets ] = useState([]);
    const [ editingBudgetId, setEditingBudgetId] = useState(null); 

    useEffect(() => {
        const getBudgets = async () => {
            try{
                const response = await fetch(`http://localhost:5000/budgets/${userId}`, {
                    method: 'GET',
                    credentials: 'include',
                });
                if(response.ok){
                    const data = await response.json();
                    // console.log('response data:', data);
                    setBudgets(data.budgets);
                    console.log('budgets:', budgets);
                    budgets.forEach(budget => {
                        console.log(budget.budget_id);
                    })
                }
            } catch(err){
                console.error('Error fetching budgets', err);
            }
        }
        getBudgets();
    }, [userId]);

    useEffect(() => {
        const getAmountExpense =  async () => {
            try{
                const response = await fetch(`http://localhost:5000/expenses/${userId}`, {
                    method: "GET",
                    credentials: "include",
                });
                if(response.ok){
                    const data = await response.json();
                    console.log(data);
                    // setSingleAmount(mapSingleAmount);
                }
            } catch(err){
                console.error("Failed fetching amount for this expense", err);
            }
        };
        getAmountExpense();
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

    const handleAddExpense = (budgetId, categoryId) => {
        setEditingBudgetId(editingBudgetId === budgetId ? null : budgetId );
        setSelectedCategory(categoryId);
        setSelectedBudgetId(budgetId);
        console.log(selectedCategory);
    };

    return (
        <>
    
             {budgets.length > 0 ? (
                <h3>Your Budgets</h3>
             ) : ('')}
                {budgets.length > 0 ? (
                    budgets.map((budget) => (
                        <div key={budget.budget_id} style={{
                            border: "1px solid #ccc",
                            padding: "10px",
                            marginBottom: "10px",
                            borderRadius: "5px"
                        }}>
                            <h4>{getCategoryName(budget.category_id)}</h4>
                            <p>Amount: 0 / {budget.amount} £</p>
                            <p>Start Date: {new Date(budget.start_date).toLocaleDateString()}</p>
                            <p>Days left: {Math.floor((new Date(budget.end_date) - new Date()) / (1000 * 60 * 60 * 24))} days</p>
                            <button onClick={() => handleAddExpense(budget.budget_id, budget.category_id)}>
                            {editingBudgetId === budget.budget_id ? "Close" : "Add expense"}
                            </button>
                            <button onClick={() => handleDelete(budget.budget_id)}>Delete</button>
                            {editingBudgetId === budget.budget_id && <AddExpenseForm selectedBudgetId={selectedBudgetId} />}
                        </div>
                    ))
                ) : (<p>No budgets found</p>)}
        </>
    )
};

export default BudgetsByUserId;