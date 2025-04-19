import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = ({ onLogout }) => {
  const [accountBalance, setAccountBalance] = useState(0.0);
  const [incomeThisMonth, setIncomeThisMonth] = useState(0.0);
  const [expensesThisMonth, setExpensesThisMonth] = useState(0.0);
  const [transactions, setTransactions] = useState([]);
  const [newTransaction, setNewTransaction] = useState({ amount: 0, type: "income", description: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
const fetchAccountData = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/account", {  
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
  } catch (error) {
    console.error("Error fetching account data:", error);
  }
};
  },[]);

  const handleAddTransaction = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");  
  
    if (!token) {
      setError("User not logged in!");
      return;
    }
  
    try {
      const response = await axios.post(
        'http://localhost:3000/api/transactions/transaction',
        {
          amount: newTransaction.amount,
          type: newTransaction.type,
          description: newTransaction.description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
  
      const updatedTransactions = [response.data, ...transactions];
      setTransactions(updatedTransactions);
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };
  
  const handleDeleteTransaction = async (transactionId) => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      setError("User not logged in!");
      return;
    }
  
    try {
      await axios.delete(`http://localhost:3000/api/transactions/${transactionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const updatedTransactions = transactions.filter((transaction) => transaction._id !== transactionId);
      setTransactions(updatedTransactions);
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };
  
  

  const recentTransactions = transactions.slice(0, 3);

  return (
    <div className="dashboard-container">
      <header className="header">
        <h1>Dashboard</h1>
        <p>Track your finances and stay on top of your goals</p>
      </header>

      <section className="add-transaction">
        <h2>Add New Transaction</h2>
        <form onSubmit={handleAddTransaction} className="transaction-form">
          <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              value={newTransaction.amount}
              onChange={(e) => setNewTransaction({ ...newTransaction, amount: parseFloat(e.target.value) })}
              placeholder="Enter transaction amount"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="type">Type</label>
            <select
              id="type"
              value={newTransaction.type}
              onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value })}
              required
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              value={newTransaction.description}
              onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
              placeholder="Enter a description"
              required
            />
          </div>
          <button type="submit" className="add-transaction-btn" disabled={loading}>
            {loading ? "Adding..." : "Add Transaction"}
          </button>
        </form>

        {error && <div className="error">{error}</div>}
      </section>

      <section className="transactions-list">
        <h2>Current session Transactions</h2>
        <div className="transactions">
          {recentTransactions.map((transaction) => (
            <div key={transaction._id} className="transaction-item">
              <div className="transaction-details">
                <p>{transaction.description}</p>
                <p>{transaction.type === "income" ? "+" : "-"}Rs.{Math.abs(transaction.amount).toFixed(2)}</p>
              </div>
              <button onClick={() => handleDeleteTransaction(transaction._id)} className="delete-btn">
                Delete
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="view-transactions">
        <Link to="/transactions" className="view-transactions-btn">
          View All Transactions
        </Link>
      </section>

      <div className="logout">
        <button onClick={onLogout} className="logout-btn">
          <Link to='/login'>Log Out</Link>
        </button>
      </div>

      <footer className="footer">
        <p>&copy; 2025 Finance Manager. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
