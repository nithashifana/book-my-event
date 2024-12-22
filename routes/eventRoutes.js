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

router.post("/create-event", authMiddleware, createEvent);
router.delete("/delete-event/:eventId", authMiddleware, deleteEvent);
router.put("/update-event/:eventId", authMiddleware, updateEvent);
router.get("/get-details/:eventId",  getEventDetails);
router.get("/get-all-details", authMiddleware, getAllEventDetails);
router.post("/reg-event/:eventId", authMiddleware, regEvent);
router.post("/attendance/:eventId", authMiddleware, attendanceEvent);
router.get("/get-attendance/:eventId", authMiddleware, getAttendance)
router.delete("/delete-reg/:eventId", authMiddleware, deleteReg);

module.exports = router;