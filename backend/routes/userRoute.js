const { register, login, getUserInfo } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.post("/register",register);

router.post("/login", login);

router.post("/user-info",authMiddleware,getUserInfo)


module.exports = router;
