'use client'

import React from "react";

import { useRouter } from 'next/navigation';

export default function Login() {
  const [accounts, setAccounts] = React.useState(() => {
    const storedValue = localStorage.getItem('accounts');
    return storedValue ? JSON.parse(storedValue) : '';})

  const [accountLogin, setAccountLogin] = React.useState("");
  const [passwordInput, setPasswordInput] = React.useState("");
  const [nameInput, setNameInput] = React.useState("");
  const [balanceInput, setBalanceInput] = React.useState();
  const router = useRouter();

  function validateForm() {
    return accountLogin.length > 0 && passwordInput.length > 0 && nameInput.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newAccount = {
      accountNumber: accountLogin,
      name: nameInput,
      balance: balanceInput,
      password: passwordInput
    }

    setAccounts([...accounts, newAccount])

    localStorage.setItem("accounts", JSON.stringify([...accounts, newAccount]));

    router.push('/login');
    console.log(accounts)
  }

  return (
    <div className="flex justify-center items-center h-screen">
      
      <form onSubmit={handleSubmit} className="flex flex-col w-64">
        <h1>CREATE ACCOUNT</h1>
        <div>
          <label className="text-white">Account Number:</label>
          <input
            className="text-black"
            type="text"
            value={accountLogin}
            onChange={(e) => setAccountLogin(e.target.value)}
          />
        </div>

        <div>
          <label className="text-white">Name:</label>
          <input
            className="text-black"
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
          />
        </div>

        <div>
          <label className="text-white">Balance:</label>
          <input
            className="text-black"
            type="text"
            value={!balanceInput && balanceInput !== 0 ? '' : balanceInput}
            onChange={(e) => setBalanceInput(e.target.value)}
          />
        </div>


        <div>
          <label>Password:</label>
          <input
            className="text-black"
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
          />
        </div>

        <br/>

        <div>
          <button className="py-2 px-3 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold rounded-md shadow focus:outline-none" type="submit" disabled={!validateForm()}>
            Create Account
          </button>
        </div>
        

      </form>
    </div>
  );
}