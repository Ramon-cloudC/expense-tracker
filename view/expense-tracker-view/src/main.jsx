import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './components/protected/auth/AUthContext.jsx'
import { BudgetCategoryProvider } from './components/context/BudgetCategoryContext.jsx'

createRoot(document.getElementById('root')).render(
    
    <StrictMode>
      <AuthProvider>
        <BudgetCategoryProvider>
            <App />
        </BudgetCategoryProvider>  
      </AuthProvider>
    </StrictMode>
)
