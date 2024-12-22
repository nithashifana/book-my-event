const express = require("express")
const {
  regUser,
  loginUser,
  getUserDetail,
  getAllUserDetail,
  deleteUser,
} = require("../controllers/userController");

const {authMiddleware} = require("../middlewares/auth");

const router = express.Router();

router.post("/reg-user", regUser);
router.post("/login-user", loginUser);
router.get("/get-details", authMiddleware, getUserDetail);
router.get("/get-all-details", authMiddleware, getAllUserDetail);
router.delete("/delete-user", authMiddleware, deleteUser);


module.exports = router;