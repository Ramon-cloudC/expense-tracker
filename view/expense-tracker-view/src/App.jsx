
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './components/HomePage';
import Login from './components/Login'
import Register from './components/Register';
import ProtectedRoute from './components/protected/auth/ProtectedRoute';
import Dashboard from './components/protected/Dashboard';



function App() {
 return(
  <>
    <Router>
        <Routes>
            <Route path='/' element={<HomePage />}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='register' element={<Register/>}/>
            {/*Protected Routes*/}
            <Route path='/dashboard' element={
               <ProtectedRoute><Dashboard/></ProtectedRoute> 
            }/>
            
        </Routes>
    </Router>
  </>
 )
}

export default App
