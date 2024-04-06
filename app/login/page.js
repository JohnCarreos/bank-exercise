'use client'

import React from "react";
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  
  const [accounts, setAccounts] = React.useState(() => {
    const storedValue = localStorage.getItem('accounts');
    return storedValue ? JSON.parse(storedValue) : '';})

  const [accountLogin, setAccountLogin] = React.useState("");
  const [passwordInput, setPasswordInput] = React.useState("");

  const [error, setError] = React.useState("")

  function validateForm() {
    return accountLogin.length > 0 && passwordInput.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const accountObj = accounts.find(account => account.accountNumber === accountLogin)
    
    if (accountObj?.password !== passwordInput) {
      setError("Invalid account number or password")
      return
    }
    localStorage.setItem("current_user", accountObj?.accountNumber);
    router.push('/');
    

  }

  return (
    <div className="flex justify-center items-center h-screen ">
      <form onSubmit={handleSubmit} className="flex flex-col w-64">
        <h1>LOG IN</h1>
        <label>Account Number:</label>
        <input
          className="text-black"
          type="text"
          value={accountLogin}
          onChange={(e) => setAccountLogin(e.target.value)}
        />

        <label>Password:</label>
        <input
          className="text-black"
          type="password"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
        />
        <br/>
        <button type="submit" disabled={!validateForm()} className="py-2 px-3 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold rounded-md shadow focus:outline-none">
          Log In
        </button>
      </form>
      <div className="text-red-500">{error}</div>
    </div>
  );
}