import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import LearnMorePage from "./components/LearnMorePage";
import Dashboard from "./components/Dashboard";
import TransactionsPage from "./components/TransactionsPage";


import "./App.css";

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem("userId")); 

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!userId) return; 

      try {
        const response = await axios.get(`http://localhost:3000/api/transactions/user/${userId}`);
        setTransactions(response.data); 
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, [userId]); 

  const addTransaction = (newTransaction) => {
    setTransactions([newTransaction, ...transactions]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/learnmore" element={<LearnMorePage />} />
        <Route path="/dashboard" element={<Dashboard onAddTransaction={addTransaction} />} />
        <Route path="/transactions" element={<TransactionsPage transactions={transactions} />} />
      </Routes>
    </Router>
  );
};

export default App;
