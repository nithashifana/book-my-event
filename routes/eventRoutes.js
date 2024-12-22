const express = require("express")
const {
  createEvent,
  deleteEvent,
  updateEvent,
  getEventDetails,
  getAllEventDetails,
  regEvent,
  attendanceEvent,
  deleteReg,
  getAttendance,
} = require("../controllers/eventController");

const {authMiddleware} = require("../middlewares/auth");

const router = express.Router();

router.post("/create", authMiddleware, createEvent);
router.delete("/dltevnt/:eventId", authMiddleware, deleteEvent);
router.put("/update/:eventId", authMiddleware, updateEvent);
router.get("/get/:eventId",  getEventDetails);
router.get("/gets", authMiddleware, getAllEventDetails);
router.post("/reg/:eventId", authMiddleware, regEvent);
router.post("/attendance/:eventId", authMiddleware, attendanceEvent);
router.get("/get-attendance/:eventId", authMiddleware, getAttendance)
router.delete("/dltreg/:eventId", authMiddleware, deleteReg);

module.exports = router;