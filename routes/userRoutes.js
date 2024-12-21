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

router.post("/reg", regUser);
router.post("/login", loginUser);
router.get("/get", authMiddleware, getUserDetail);
router.get("/gets", authMiddleware, getAllUserDetail);
router.delete("/delete", authMiddleware, deleteUser);


module.exports = router;