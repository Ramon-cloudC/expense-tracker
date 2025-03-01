import { useContext, createContext, useState } from "react";

const BudgetCategoryContext = createContext();

const BudgetCategoryProvider = ({children}) => {

    const [selectedCategory, setSelectedCategory ] = useState(null);

    return (
        <BudgetCategoryContext.Provider value = {{ selectedCategory, setSelectedCategory}}>
            {children}
        </BudgetCategoryContext.Provider>
    )
};

const useBudgetCategory = () => {
    return useContext(BudgetCategoryContext);
};

export { BudgetCategoryContext, BudgetCategoryProvider, useBudgetCategory};