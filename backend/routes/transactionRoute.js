const router = require("express").Router();
const { transferFunds, verifyAccount, getAllTransactions } = require("../controllers/transactionController");
const authMiddleware = require("../middlewares/authMiddleware");


router.post("/transfer-funds", authMiddleware, transferFunds);

router.post("/verify-account", authMiddleware, verifyAccount);

router.post("/get-all-transactions", authMiddleware, getAllTransactions);


module.exports = router;
