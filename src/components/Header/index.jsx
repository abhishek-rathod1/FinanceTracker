import React from 'react'
import './styles.css'
const Header = () => {
    function logoutFnc() {
        alert("Logout functionality not implemented yet");
    }
  return (
    <div className='navbar'>
        <p className='heading'>FinanceTracker</p>
        <p className='logout link' onClick={logoutFnc}>Logout</p>
    </div>
  )
}

export default Header