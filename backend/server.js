const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/restaurantdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// Define Reservation Schema and Model
const reservationSchema = new mongoose.Schema({
  name: String,
  date: String,
  time: String,
  people: Number,
  phone: String,
  message: String
});

const Reservation = mongoose.model("Reservation", reservationSchema);

// Route to handle reservation
app.post("/api/reservations", async (req, res) => {
  const reservation = new Reservation(req.body);
  try {
    const savedReservation = await reservation.save();
    console.log("✅ Reservation saved:", savedReservation);
    res.json({ message: "Reservation saved", data: savedReservation });
  } catch (err) {
    console.error("❌ Error saving reservation:", err);
    res.status(500).json({ message: "Failed to save reservation", error: err });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
