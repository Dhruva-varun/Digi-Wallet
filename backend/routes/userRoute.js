const { depositeFunds } = require("../controllers/transactionController");
const { register, login, getUserInfo, getAllUsers, UpdateVerifyStatus } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.post("/register",register);

router.post("/login", login);

router.post("/user-info",authMiddleware,getUserInfo);

router.post("/get-all-users",authMiddleware,getAllUsers);

router.post("/update-user-verified-status",authMiddleware,UpdateVerifyStatus);

router.post("/deposite-funds", authMiddleware,depositeFunds);

module.exports = router;
