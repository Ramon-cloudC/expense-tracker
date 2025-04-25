import { useState, useContext} from "react";
import { AuthContext } from "./protected/auth/AuthContext";
import { BudgetCategoryContext } from "./context/BudgetCategoryContext";
import styles from "./css-modules/AddExpenseForm.module.css";

//TODO: 
// Implement Save changes button (in progress)
// Implement adding amount dynamically when adding expenses and keep track of the amount for that specific budget; 
// Add budget_id in the payload and send to the db (DONE)
// Retrieve userId, categoryId still not sending to db (DONE)



const AddExpenseForm =({selectedBudgetId})=> {

const { userId } = useContext(AuthContext);
const { selectedCategory } = useContext(BudgetCategoryContext);
const [ expenseAmount, setExpenseAmount ] = useState("");
const [ successMessage, setSuccessMessage ] = useState("");
const [ errorMessage, setErrorMessage ] = useState("");
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

  if (!userId || !selectedCategory || !expenseAmount || !description) {
    console.error("Missing mandatory inputs");
    setErrorMessage("Amount and description are required.");
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
        <h3 className={styles.h3Add}>Add Expense</h3>
      <form onSubmit={handleSubmit} className={styles.formDiv}>
        <div className={styles.labelDiv}>
          <label>Amount:</label>
          <input className={styles.inputs} type="number" name="amount" min={0} step="0.01" onChange={handleExpenseAmountChange} value={expenseAmount}/>
        </div>
        <div className={styles.labelDiv}>
          <label>Description:</label>
          <input className={styles.inputs} type="text-area" name="description" value={description}  onChange={handleDescriptionChange}/> 
        </div>
          <br/>
        <button className= {styles.saveButton} type="submit">Save Changes</button>
      </form>
      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p className={styles.err}>{errorMessage}</p>}
    </div>
  )
};

export default AddExpenseForm;
