"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [accounts, setAccounts] = React.useState();

  const [withdrawalAmount, setWithdrawalAmount] = React.useState();
  const [depositAmount, setDepositAmount] = React.useState();
  const [transferAmount, setTransferAmount] = React.useState();
  const [recipient, setRecipient] = React.useState();
  const [error, setError] = React.useState("");
  const [currentAccountNumber, setCurrentAccountNumber] = React.useState();
  const [currentAccountName, setCurrentAccountName] = React.useState("");
  const [currentBalance, setCurrentBalance] = React.useState(0);

  const router = useRouter();

  React.useEffect(() => {
    const storedAccounts = JSON.parse(localStorage.getItem("accounts"));
    const currentUser = localStorage.getItem("current_user");

    if (currentUser) {
      const currentUserObj = storedAccounts.find(
        (account) => account.accountNumber === currentUser
      );
      setCurrentAccountName(currentUserObj["name"]);
      setCurrentAccountNumber(currentUserObj["accountNumber"]);
      setCurrentBalance(currentUserObj["balance"]);

      // console.log(currentUserObj, currentUser, storedAccounts);
    }

    if (storedAccounts) {
      setAccounts(storedAccounts);
    } else {
      setAccounts([]);
    }
  }, []);

  function withdraw(accountNum, amount) {
    const accountObj = accounts.find(
      (account) => account.accountNumber === accountNum
    );

    if (amount < 0 || parseFloat(accountObj.balance) < amount || !amount) {
      setError("Invalid input amount");
      return;
    }

    const newBalance = parseFloat(accountObj.balance) - amount;

    setCurrentBalance(newBalance);

    const newAccountObj = {
      ...accountObj,
      balance: newBalance,
    };

    const accountsArray = accounts.filter(
      (account) => account.accountNumber !== accountNum
    );
    const newAccounts = [...accountsArray, newAccountObj];

    localStorage.setItem("accounts", JSON.stringify(newAccounts));
    setAccounts(newAccounts);
    setWithdrawalAmount();
  }

  function deposit(accountNum, amount) {
    if (amount < 0 || !amount) {
      setError("Invalid input amount");
      return;
    }

    const accountObj = accounts.find(
      (account) => account.accountNumber === accountNum
    );

    const newBalance = parseFloat(accountObj.balance) + parseFloat(amount);

    setCurrentBalance(newBalance);

    const newAccountObj = {
      ...accountObj,
      balance: newBalance,
    };

    const accountsArray = accounts.filter(
      (account) => account.accountNumber !== accountNum
    );
    const newAccounts = [...accountsArray, newAccountObj];

    localStorage.setItem("accounts", JSON.stringify(newAccounts));
    setAccounts(newAccounts);
    setDepositAmount();
  }

  function transfer(senderAccount, receiverAccount, amount) {
    const senderAccountObj = accounts.find(
      (account) => account.accountNumber === senderAccount
    );

    if (
      amount < 0 ||
      parseFloat(senderAccountObj.balance) < amount ||
      !amount ||
      !receiverAccount
    ) {
      setError("Invalid input amount");
      return;
    }

    const newSenderAccountObj = {
      ...senderAccountObj,
      balance: parseFloat(senderAccountObj.balance) - parseFloat(amount),
    };

    const receiverAccountObj = accounts.find(
      (account) => account.accountNumber === receiverAccount
    );

    if (!receiverAccountObj) {
      setError("Invalid input amount");
      return;
    }
    console.log(receiverAccountObj);
    const newReceiverAccountObj = {
      ...receiverAccountObj,
      balance: parseFloat(receiverAccountObj.balance) + parseFloat(amount),
    };

    const accountsArray = accounts.filter(
      (account) =>
        ![
          senderAccountObj.accountNumber,
          receiverAccountObj.accountNumber,
        ].includes(account.accountNumber)
    );

    const newBalance =
      parseFloat(senderAccountObj.balance) - parseFloat(amount);

    setCurrentBalance(newBalance);

    const newAccounts = [
      ...accountsArray,
      newSenderAccountObj,
      newReceiverAccountObj,
    ];

    localStorage.setItem("accounts", JSON.stringify(newAccounts));
    setAccounts(newAccounts);
    setTransferAmount();
  }

  function handleLogout() {
    localStorage.setItem("current_user", "");
    router.push("/");
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex flex-col w-80 ">
        <div className="text-2xl">Name: {currentAccountNumber}</div>
        <div className="text-2xl">Account Number: {currentAccountName}</div>
        <div className="text-2xl">Balance: {currentBalance}</div>
        <br />
        TRANSACTIONS
        <form
          className="m-1 space-x-4 items-center"
          onSubmit={(event) => {
            event.preventDefault();
            withdraw(currentAccountNumber, withdrawalAmount);
          }}
        >
          <input
            className="text-black w-40"
            type="number"
            value={
              !withdrawalAmount && withdrawalAmount !== 0
                ? ""
                : withdrawalAmount
            }
            placeholder="Withdraw Amount"
            onChange={(e) => {
              setWithdrawalAmount(e.target.value);
            }}
            onClick={(e) => setError("")}
          />
          <button className="py-1 px-3 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold rounded-md shadow focus:outline-none">
            Withdraw
          </button>
        </form>
        <form
          className="m-1 space-x-4"
          onSubmit={(event) => {
            event.preventDefault();
            deposit(currentAccountNumber, depositAmount);
          }}
        >
          <input
            className="text-black w-40"
            type="number"
            value={!depositAmount && depositAmount !== 0 ? "" : depositAmount}
            placeholder="Deposit Amount"
            onChange={(e) => {
              setDepositAmount(e.target.value);
            }}
            onClick={(e) => setError("")}
          />
          <button className="py-1 px-3 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold rounded-md shadow focus:outline-none">
            Deposit
          </button>
        </form>
        <form
          className="flex flex-col m-1 space-x-4 mt-6 items-center"
          onSubmit={(event) => {
            event.preventDefault();
            transfer(currentAccountNumber, recipient, transferAmount);
          }}
        >
          <label htmlFor="recipient">Transfer to:</label>
          <input
            id="recipient"
            className="text-black"
            placeholder="Transfer Amount"
            type="text"
            onChange={(e) => {
              setRecipient(e.target.value);
            }}
            onClick={(e) => setError("")}
          />

          <label htmlFor="transfer-amount">Transfer Amount:</label>
          <input
            id="transfer-amount"
            className="text-black"
            placeholder="Transfer Amount"
            type="number"
            value={
              !transferAmount && transferAmount !== 0 ? "" : transferAmount
            }
            onChange={(e) => {
              setTransferAmount(e.target.value);
            }}
            onClick={(e) => setError("")}
          />
          <button className="py-1 px-3 mt-2 mr-32 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold rounded-md shadow focus:outline-none">
            Transfer
          </button>
          <div className="text-red-500">{error}</div>
        </form>
      </div>
      <button
        className="py-1 px-3 mt-6 bg-rose-500 hover:bg-rose-700 text-white text-sm font-semibold rounded-md shadow focus:outline-none"
        onClick={handleLogout}
      >
        logout
      </button>
    </div>
  );
}
