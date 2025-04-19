const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const userRoutes = require("./routes/user");
const transactionRoutes = require("./routes/transactions"); 
const cors = require("cors");

dotenv.config();

const app = express();

app.use(cors()); 
app.use(bodyParser.json()); 

mongoose
  .connect("mongodb://127.0.0.1:27017/finance_manager", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/users", userRoutes); 
app.use("/api/transactions", transactionRoutes); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
