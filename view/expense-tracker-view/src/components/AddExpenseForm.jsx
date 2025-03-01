import { useState, useContext} from "react";
import { AuthContext } from "./protected/auth/AuthContext";
import { BudgetCategoryContext } from "./context/BudgetCategoryContext";
// import { BudgetIdContext } from "./context/BudgetIdContext";

//TODO: 
// Implement Save changes button
// Add budget_id in the payload and send to the db
// Retrieve userId, categoryId still not sending to db (DONE)



const AddExpenseForm =({selectedBudgetId})=> {

const { userId } = useContext(AuthContext);
const { selectedCategory } = useContext(BudgetCategoryContext);
// const { selectedBudgetId } = useContext(BudgetIdContext);
const [ expenseAmount, setExpenseAmount ] = useState("");
const [ successMessage, setSuccessMessage ] = useState("");
const [ description, setDescription ] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("Submitting Expense:");
  console.log("User ID:", userId);
  console.log("Category ID:", selectedCategory);
  console.log("Amount:", expenseAmount);
  console.log("Date:", new Date().toISOString().split("T")[0]);
  console.log("Description:", description);
  console.log("Budget ID:", selectedBudgetId );

  if (!userId || !selectedCategory) {
    console.error("Missing userId or selectedCategory");
    return;
  }
  
  try{
    const response = await fetch("http://localhost:5000/expenses/add", {
      method: "POST",
      headers:{
        "Content-Type":"application/json",
      },
      body: JSON.stringify({
        userId: userId, 
        categoryId: selectedCategory,
        amount: Number(expenseAmount),
        date: new Date().toISOString().split("T")[0],
        description: description,
        budgetId: selectedBudgetId,
      }),
      credentials: "include",
    });

    if(response.ok){
      setSuccessMessage("Expense successfully added!");
      setExpenseAmount("");
      setDescription("");
    }
  } catch(err){
    console.error('Error adding expense', err);
  }


};

const handleExpenseAmountChange = (e) => {
  setExpenseAmount(e.target.value);
  console.log(expenseAmount);
};

const handleDescriptionChange = (e) => {
  setDescription(e.target.value);
  console.log(description);
};




  return (
    <div>
        <h3>Add Expense</h3>
      <form onSubmit={handleSubmit}>
        <label>Amount:</label>
        <input type="number" name="amount" min={0} placeholder="Enter amount" onChange={handleExpenseAmountChange} value={expenseAmount}/>
        <label>Description:</label>
        <input type="text-area" name="description" value={description} onChange={handleDescriptionChange}/> <br/>
        <button type="submit">Save Changes</button>
      </form>
      {successMessage && <p>{successMessage}</p>}
    </div>
  )
};

export default AddExpenseForm;
