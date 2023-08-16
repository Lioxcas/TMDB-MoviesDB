const express = require("express");
const router = express.Router();
const { login, logout, refresh } = require("../controllers/authController");

router.post("/", (req, res) => {
  login(req, res);
});

router.get("/refresh", (req, res) => {
  refresh(req, res);
});

router.post("/logout", (req, res) => {
  logout(req, res);
});

module.exports = router;
