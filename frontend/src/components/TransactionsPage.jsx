import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TransactionsPage.css";

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setLoading(false);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setError("Failed to fetch transactions");
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []); 

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
        setTransactions(transactions.filter(transaction => transaction._id !== transactionId));
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
        <section className="transactions-list">
          <div className="transactions">
            {transactions.length === 0 ? (
              <p>No transactions found</p>
            ) : (
              transactions.map((transaction) => (
                <div key={transaction._id} className="transaction-item">
                  <div className="transaction-details">
                    <p>{transaction.description}</p>
                    <p>{transaction.type === "income" ? "+" : "-"}${Math.abs(transaction.amount).toFixed(2)}</p>
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
      )}
    </div>
  );
};

export default TransactionsPage;
