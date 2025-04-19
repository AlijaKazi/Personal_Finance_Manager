import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TransactionsPage.css";

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchTransactions = async () => {
      const token = localStorage.getItem("token");  

      if (!token) {
        setError("User not logged in!");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:3000/api/transactions", {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });

        setTransactions(response.data);
        calculateTotals(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setError("Failed to fetch transactions");
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const calculateTotals = (transactions) => {
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const expense = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    const amount = income - expense;

    setTotalIncome(income);
    setTotalExpense(expense);
    setTotalAmount(amount);
  };

  const deleteTransaction = async (transactionId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("User not logged in!");
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:3000/api/transactions/${transactionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      if (response.data.message === "Transaction deleted successfully") {
        const updatedTransactions = transactions.filter(transaction => transaction._id !== transactionId);
        setTransactions(updatedTransactions);
        calculateTotals(updatedTransactions);
      }
    } catch (error) {
      console.error("Error deleting transaction:", error);
      setError("Failed to delete transaction");
    }
  };

  return (
    <div className="transactions-page">
      <header className="header">
        <h1>All Transactions</h1>
      </header>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <div className="summary">
            <div className="row">
              <p>Total Income: <span className="income">Rs.{totalIncome.toFixed(2)}</span></p>
              <p>Total Expense: <span className="expense">Rs.{totalExpense.toFixed(2)}</span></p>
            </div>
            <br />
            <div className="centered">
              <p>Balance: <span className={`amount ${totalAmount >= 0 ? "positive" : "negative"}`}>
                Rs.{totalAmount.toFixed(2)}
              </span></p>
            </div>
          </div>

          <section className="transactions-list">
            <div className="transactions">
              {transactions.length === 0 ? (
                <p>No transactions found</p>
              ) : (
                transactions.map((transaction) => (
                  <div key={transaction._id} className="transaction-item">
                    <div className="transaction-details">
                      <p>{transaction.description}</p>
                      <p>{transaction.type === "income" ? "+" : "-"}Rs.{Math.abs(transaction.amount).toFixed(2)}</p>
                      <p className="transaction-date">
                        {new Date(transaction.date).toLocaleDateString("en-IN")}
                      </p>
                    </div>
                    <button
                      className="delete-btn"
                      onClick={() => deleteTransaction(transaction._id)}
                    >
                      Delete
                    </button>
                  </div>
                ))
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default TransactionsPage;
