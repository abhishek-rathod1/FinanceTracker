import './App.css'
import Header from './components/Header'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
// import SignupSignin from './components/SignupSignin'
import Dashboard from './pages/Dashboard'
import Signup from './pages/Signup'
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
function App() {
  

  return (
    <>
    <ToastContainer/>
    <Router>
      <Routes>
        <Route path='/' element={<Signup/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
    </Router>
    </>
   
  )
}

export default App
