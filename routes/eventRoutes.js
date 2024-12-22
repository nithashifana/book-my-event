const express = require("express")
const {
  createEvent,
  deleteEvent,
  updateEvent,
  getEventDetails,
  getAllEventDetails,
  regEvent,
  deleteReg,
} = require("../controllers/eventController");

const {authMiddleware} = require("../middlewares/auth");

const router = express.Router();

router.post("/create", authMiddleware, createEvent);
router.delete("/dltevnt/:eventId", authMiddleware, deleteEvent);
router.put("/update/:eventId", authMiddleware, updateEvent);
router.get("/get/:eventId",  getEventDetails);
router.get("/gets", authMiddleware, getAllEventDetails);
router.post("/reg/:eventId", authMiddleware, regEvent);
router.delete("/dltreg/:eventId", authMiddleware, deleteReg);

module.exports = router;