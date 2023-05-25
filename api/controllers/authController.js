const { User } = require("../models");
const jwt = require("jsonwebtoken");

require("dotenv").config();

/////Sign In//////
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Email and Password are required." });

  const foundUser = await User.findOne({
    where: {
      email,
    },
  });
  if (!foundUser) res.status(401).json({ message: "Unauthorized" });

  const match = await foundUser.validatePassword(password);

  if (!match) res.status(401).json({ mesage: "Unauthorized" });
  else {
    const payload = {
      username: foundUser.username,
    };

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("refreshT", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({
      username: foundUser.username,
      favorites: foundUser.favorites,
      accessToken,
    });
  }
};

///Refresh Access token////////////////

const refresh = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.refreshT)
    return res.status(401).json({ message: "Unauthorized" });

  const refreshToken = cookies.refreshT;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) return res.status(403).json({ mesagge: "Forbidden" });

      const foundUser = await User.findOne({
        where: { username: decoded.username },
      });

      if (!foundUser) return res.status(401).json({ message: "Unauthorized" });

      const username = foundUser.dataValues.username;
      const favorites = foundUser.dataValues.favorites;

      const accessToken = jwt.sign(
        {
          username: decoded.username,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );
      res.json({ username, favorites, accessToken });
    }
  );
};

const logout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.refreshT) return res.sendStatus(204);
  res.clearCookie("refreshT", {
    httpOnly: true,
  });
  res.json({ message: "Cookie cleared" });
};

module.exports = { login, refresh, logout };
