import React from 'react'
import NoTransactionIcon from '../../assets/noTransaction.svg'
import './styles.css'
const NoTransactions = () => {
  return (
    <div className='no-tranx-container'>
      <img className='no-tranx-img' src={NoTransactionIcon}/>
      <p className='no-tranx-p'>You have No Transactions Currently</p>
    </div>
  )
}

export default NoTransactions