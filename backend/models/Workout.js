// backend/models/Workout.js
const mongoose = require("mongoose");

const WorkoutSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Workout", WorkoutSchema);