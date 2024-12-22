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

router.post("/create-venue", authMiddleware, create);
router.put("/update-venue/:venueId", authMiddleware, update);
router.get("/get-details/:venueId", getDetail);
router.get("/get-all-details", getAllDetail);
router.delete("/delete-venue/:venueId", authMiddleware, deleteVenue);


module.exports = router;