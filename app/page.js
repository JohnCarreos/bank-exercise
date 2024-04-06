"use client"

import React from 'react';

export default function Home() {
  const [accounts, setAccounts] = React.useState(() => {
    const storedValue = localStorage.getItem('accounts');
    return storedValue ? JSON.parse(storedValue) : '';})

  const [withdrawalAmount, setWithdrawalAmount] = React.useState()
  const [depositAmount, setDepositAmount] = React.useState()
  const [transferAmount, setTransferAmount] = React.useState()
  const [error, setError] = React.useState("")

  const [currentUser, setCurrentUser] = React.useState(() => {
    const storedValue = localStorage.getItem('current_user');
    return storedValue ? JSON.parse(storedValue) : '';})

  const [currentBalance, setCurrentBalance] = React.useState(0)

  React.useEffect(() => {},[])
  
  function withdraw(accountNum, amount) {

    const accountObj = accounts.find(account => account.accountNumber === accountNum)

    if (amount < 0 || parseFloat(accountObj.balance) < amount) {
      setError("Invalid input amount")
      return 
    }

    const newAccountObj = {...accountObj, balance: parseFloat(accountObj.balance) - amount}
  
    const accountsArray = accounts.filter(account => account.accountNumber !== accountNum)
    const newAccounts = [...accountsArray, newAccountObj]

    setAccounts(newAccounts)
    console.log(newAccounts)

  }

  function deposit(accountNum, amount) {

    if (amount < 0) {
      setError("Invalid input amount")
      return 
    }

    const accountObj = accounts.find(account => account.accountNumber === accountNum)
    const newAccountObj = {...accountObj, balance: parseFloat(accountObj.balance) + parseFloat(amount)}
   
    const accountsArray = accounts.filter(account => account.accountNumber !== accountNum)
    const newAccounts = [...accountsArray, newAccountObj]

    setAccounts(newAccounts)

  }

  function transfer(senderAccount, receiverAccount, amount) {

    const senderAccountObj = accounts.find(account => account.accountNumber === senderAccount)

    if (amount < 0 || parseFloat(senderAccountObj.balance) < amount) {
      setError("Invalid input amount")
      return 
    }
    
    const newSenderAccountObj = {...senderAccountObj, balance: parseFloat(senderAccountObj.balance) - parseFloat(amount)}

    const receiverAccountObj = accounts.find(account => account.accountNumber === receiverAccount)
    const newReceiverAccountObj = {...receiverAccountObj, balance: parseFloat(receiverAccountObj.balance) + parseFloat(amount)}

    const accountsArray = accounts.filter(account => ![senderAccountObj.accountNumber, receiverAccountObj.accountNumber].includes(account.accountNumber))
    const newAccounts = [...accountsArray, newSenderAccountObj, newReceiverAccountObj]

    setAccounts(newAccounts)

  }

  return (
    <main className="flex justify-center items-center h-screen" >

      <div className="flex flex-col w-96 space-x-4" >
      <div className='text-2xl'>Balance: {currentBalance}</div>
        TRANSACTIONS
        <form 
          className='m-1 space-x-4'
          onSubmit={(event) => {
          event.preventDefault()
          }
        }>
          <input 
            className="text-black"
            type="number" 
            value={!withdrawalAmount && withdrawalAmount !== 0 ? '' : withdrawalAmount}
            placeholder='Withdraw Amount'
            onChange={(e) => {setWithdrawalAmount(e.target.value);
                              setError("");}}
                  
          />
          <button className="py-1 px-3 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold rounded-md shadow focus:outline-none">Withdraw</button>
        </form>

        <form 
          className='m-1 space-x-4'
          onSubmit={(event) => {
          event.preventDefault()
          }
        }>
          <input 
            className="text-black"
            type="number" 
            value={!depositAmount && depositAmount !== 0 ? '' : depositAmount}
            placeholder='Deposit Amount'
            onChange={(e) => {setDepositAmount(e.target.value);
                              setError("");}}
          />
          <button className="py-1 px-3 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold rounded-md shadow focus:outline-none">Deposit</button>
        </form>

        <form 
          className='m-1'
          onSubmit={(event) => {  
          event.preventDefault()
          transfer("123", "234" ,transferAmount)
          }
        }>
          <input 
            className="text-black"
            placeholder='Transfer Amount'
            type="number" 
            value={!transferAmount && transferAmount !== 0 ? '' : transferAmount}
            onChange={(e) => {setTransferAmount(e.target.value);
                              setError("");}}
          />
          <button className="py-1 px-3 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold rounded-md shadow focus:outline-none">Transfer</button>
        </form>
        
        <div className="text-red-500">{error}</div>
      </div>
    </main>
  );
}
