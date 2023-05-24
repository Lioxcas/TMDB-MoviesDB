const { User } = require("../models");

class userController {
  ///get All users///

  static async getAll(req, res) {
    const allUsers = await User.findAll();
    if (!allUsers) return res.sendStatus(400);
    res.send(allUsers).status(200);
  }

  //Get user Info
  static async getUser(req, res) {
    const email = req.params.email;
    console.log(email);
    try {
      const user = await User.findOne({
        where: { email },
      });
      if (!user) res.status(400).json("User not found");
      else {
        const payload = {
          email: user.email,
          username: user.username,
          favorites: user.favorites,
        };
        res.status(200).send(payload);
      }
    } catch (error) {
      res
        .status(400)
        .json(
          `There was an error while trying to retrieve the user, please try again,${error}`
        );
    }
  }

  /////New User Sign Up/////

  static async createUser(req, res) {
    const { username, email, password } = req.body;
    try {
      const isUser = await User.findOne({
        where: { email },
      });
      if (isUser) res.status(400).json("User already exist");
      else {
        const newUser = await User.create(req.body);
        res.status(201).send(newUser);
      }
    } catch (error) {
      res
        .status(400)
        .json(
          `There was an error while trying to register the user, please try again,${error}`
        );
    }
  }
}
module.exports = userController;
