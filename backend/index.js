const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path") 


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

app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
