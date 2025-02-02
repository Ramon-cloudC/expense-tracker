import { useState } from 'react';

const Budget = () => {
    const [ amount, setAmount ] = useState('');
    const [ categoryId, setCategory ] = useState('');
    const [ successMessage, setSuccessMessage ] = useState(''); 
    const [ userId, setUserId] = useState('');
    const [ startDate, setStartDate ] = useState('');
    const [ endDate, setEndDate ] = useState('');

    const handleAmountChange = (e) => {
        setAmount(Number(e.target.value));
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handleUserIdChange = (e) => {
        setUserId(e.target.value);
    }

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    }

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    }

    // Send info to the backend and create a budget
  
        
        const handleSubmit = async(e) => {
            e.preventDefault();

            if(!amount || !categoryId){
                alert('Input fields required.')
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
            <h3>Your budget</h3>
            <form onSubmit={handleSubmit} >
                <label>
                    User id:
                    <input type='number' name='userId' value={userId} onChange={handleUserIdChange}/>
                </label>
                <label>
                    Category Id:
                    <input type='number' name='categoryId' value={categoryId} onChange={handleCategoryChange}/>
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
                <button type='submit'>Save</button>
            </form>
            {/* {budget ? <p>Available budget: {budget}</p> : ''} */}
            {successMessage ? <p>{successMessage}</p> : ''}
            
        </>
    )
};

export default Budget;