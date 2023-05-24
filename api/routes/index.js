const express = require("express");
const usersRouter = require("./usersRoutes");
const authRouter = require("../routes/authRoutes");
const favsRouter = require("../routes/favsRoutes");

const router = express.Router();

router.use("/users", usersRouter);
router.use("/auth", authRouter);
router.use("/favorites", favsRouter);

module.exports = router;
