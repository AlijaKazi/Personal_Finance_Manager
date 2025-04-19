const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");
const authenticate = require("../middleware/authenticate");  

router.get("/", authenticate, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user._id });  
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/transaction", authenticate, async (req, res) => {
  const { amount, type, description } = req.body;

  if (!amount || !type || !description) {
    return res.status(400).json({ message: "Amount, type, and description are required" });
  }

  const transaction = new Transaction({
    amount,
    type,
    description,
    userId: req.user._id,  
  });

  try {
    const newTransaction = await transaction.save();  
    res.status(201).json(newTransaction);  
  } catch (error) {
    res.status(400).json({ message: error.message });  
  }
});

router.delete("/:id", authenticate, async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndDelete({ 
      _id: req.params.id,  
      userId: req.user._id  
    });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found or you are not authorized" });
    }

    res.json({ message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting transaction" });
  }
});

module.exports = router;
