import { useState, useContext } from 'react';
import { AuthContext } from './protected/auth/AUthContext';
import BudgetsByUserId from './BudgetsByUserId';


const CreateBudget = () => {

    const { userId } = useContext(AuthContext);
    const [ amount, setAmount ] = useState('');
    const [ category, setCategory ] = useState('');
    const [ categoryId, setCategoryId ] = useState('');
    const [ startDate, setStartDate ] = useState('');
    const [ endDate, setEndDate ] = useState('');
    
    const [ successMessage, setSuccessMessage ] = useState(''); 
    
    const handleAmountChange = (e) => {
        setAmount(e.target.value);
        setSuccessMessage('');
    };

    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;
        setCategory(selectedCategory);

        const categoryMapId = {
            'Groceries': 1,
            'Utilities': 2,
            'Transportation': 3,
            'Housing': 4,
            'Healthcare': 5,
            'Personal Care': 6,
            'Insurances': 7,
            'Entertainment': 8,
        }

        setCategoryId(categoryMapId[selectedCategory]);
        setSuccessMessage('');
    };

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
        setSuccessMessage('');
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
        setSuccessMessage('');
    };

    // Send info to the backend and create a budget
  
        
        const handleSubmit = async(e) => {
            e.preventDefault();
            console.log(`Category selected: ${category}, ID: ${categoryId}`);
            console.log("User ID:", userId);
            console.log("Amount:", amount)
            if(!amount || !startDate || !endDate){
                alert('Input fields required.');
                return;
            }
            try{
                const response = await fetch('http://localhost:5000/budgets', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId,
                        categoryId,
                        amount, 
                        startDate,
                        endDate
                    }),
                    credentials: 'include',
                });

                if(response.ok){
                    setSuccessMessage('Your budget has been created!');
                }
            } catch(err){
                console.error('Error creating budget, try again', err);
            }
          
        }


    return (
        <>
            <h3>Create budget</h3>
            <form onSubmit={handleSubmit} >
                <label>
                    Category:
                    <select value={category} onChange={handleCategoryChange}>
                        <option value=''>Select</option>
                        <option value='Groceries'>Groceries</option>
                        <option value='Utilities'>Utilities</option>
                        <option value='Transportation'>Transportation</option>
                        <option value='Housing'>Housing</option>
                        <option value='Healthcare'>Healthcare</option>
                        <option value='Personal Care'>Personal Care</option>
                        <option value='Insurances'>Insurances</option>
                        <option value='Entertainment'>Entertainment</option>
                    </select>
                </label>
                <label>
                    Set Amount:
                    <input type='number' name='amount' value={amount} onChange={handleAmountChange}/> 
                </label>
                <label>
                    Start Date: 
                    <input type='date' name='startDate' value={startDate} onChange={handleStartDateChange}/>
                </label>
                <label>
                    End Date: 
                    <input type='date' name='endDate' value={endDate} onChange={handleEndDateChange}/>
                </label>
                <button type='submit'>Add Budget</button>
            </form>
            {/* {budget ? <p>Available budget: {budget}</p> : ''} */}
            {successMessage ? <p>{successMessage}</p> : ''}
            {userId && (< BudgetsByUserId />)}
            
        </>
    )
};

export default CreateBudget;