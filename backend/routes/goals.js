// backend/routes/goals.js
const express  = require("express");
const passport = require("passport");
const Goal     = require("../models/Goal");
const router   = express.Router();

// POST /api/goals
// Создать новую цель (title в body, completed опционально)
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const { title, completed } = req.body;
      const goal = await Goal.create({
        user: req.user.id,
        title,
        completed: completed === true
      });
      res.json(goal);
    } catch (err) {
      next(err);
    }
  }
);

// GET /api/goals
// Получить все цели текущего пользователя
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const goals = await Goal
        .find({ user: req.user.id })
        .sort({ date: -1 });
      res.json(goals);
    } catch (err) {
      next(err);
    }
  }
);

// DELETE /api/goals/:id
// Удалить цель текущего пользователя по её ID
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const result = await Goal.findOneAndDelete({
        _id: req.params.id,
        user: req.user.id
      });
      if (!result) {
        return res.status(404).json({ message: 'Goal not found' });
      }
      res.json({ success: true, deletedId: req.params.id });
    } catch (err) {
      next(err);
    }
  }
);

// PATCH /api/goals/:id
router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const goal = await Goal.findOneAndUpdate(
        { _id: req.params.id, user: req.user.id },
        { completed: req.body.completed === true },
        { new: true }
      );
      res.json(goal);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
