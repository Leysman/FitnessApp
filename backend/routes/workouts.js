// backend/routes/workouts.js
const express = require("express");
const passport = require("passport");       // если у тебя JWT‑защита через passport
const Workout  = require("../models/Workout");
const router   = express.Router();

// POST /api/workouts
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
       // 1) Создаем тренировку
      const workout = await Workout.create({ user: req.user.id });

      // 2) Обновляем поле lastClickWorkout у пользователя
      await User.findByIdAndUpdate(req.user.id, {
        lastClickWorkout: new Date()
      });

      res.json(workout);
    } catch (err) {
      next(err);
    }
  }
);

// GET /api/workouts
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const workouts = await Workout
        .find({ user: req.user.id })
        .sort({ date: -1 });
      res.json(workouts);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;