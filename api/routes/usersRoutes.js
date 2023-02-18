const express = require("express");
const router = express.Router();
const auth = require("../middlewares/verifyToken");
const userController = require("../controllers/userController");

router.get("/", auth, (req, res) => {
  userController.getAll(req, res);
});

router.post("/signUp", (req, res) => {
  userController.createUser(req, res);
});

module.exports = router;
