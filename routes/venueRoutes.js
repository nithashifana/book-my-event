const express = require("express")
const {
  create,
  update,
  getDetail,
  getAllDetail,
  deleteVenue
} = require("../controllers/venueController");

const {authMiddleware} = require("../middlewares/auth");

const router = express.Router();

router.post("/create", authMiddleware, create);
router.put("/update/:venueId", authMiddleware, update);
router.get("/get/:venueId", getDetail);
router.get("/gets", getAllDetail);
router.delete("/delete/:venueId", authMiddleware, deleteVenue);


module.exports = router;