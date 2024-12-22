// const userModel = require("../models/userModel")
const eventModel = require("../models/eventModel");
const venueModel = require("../models/venueModel");

/*
const now = new Date()
const formattedDate = formatDate()

*/

module.exports = async (venue, date, a, b, excludedEvent = null) => {
  const existVenue = await venueModel.findOne({ name: venue });
  if (!existVenue) {
    return 0;
  }

  const allEvents = await eventModel.find({
    venue: existVenue._id,
    date: date,
  });

  for (const event of allEvents) {
    if(excludedEvent && event._id.toString() === excludedEvent.toString()) {
      continue;
    }
    if (b > event.startTime && a < event.endTime) {
      return 0;
    }
  }
  return 1;
};
