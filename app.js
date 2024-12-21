const express = require("express");
const { connectDB } = require("./config/db");
require("dotenv").config();

// const eventRoute = require('./routes/eventRoutes')
const userRoute = require('./routes/userRoutes')
const venueRoute = require('./routes/venueRoutes')

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

// app.use('/api/event', eventRoute);
app.use('/api/user', userRoute);
app.use('/api/venue', venueRoute);

connectDB();
app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
