const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

const userRoute = require("./routes/userRoute");
const transactionRoute = require("./routes/transactionRoute");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.use("/api/users", userRoute);
app.use("/api/transactions", transactionRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
