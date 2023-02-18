const express = require("express");
const usersRouter = require("./usersRoutes");
const authRouter = require("../routes/authRoutes");

const router = express.Router();

router.use("/users", usersRouter);
router.use("/auth", authRouter);

module.exports = router;
