const S = require("sequelize");
const db = require("../db");
const bcrypt = require("bcrypt");

class User extends S.Model {
  ////Hash Password///
  hashPassword(password, salt) {
    return bcrypt.hash(password, salt).catch((error) => console.log(error));
  }
  ///Check for password validation///
  validatePassword(password) {
    return bcrypt
      .hash(password, this.salt)
      .then((passwordHashed) => passwordHashed === this.password);
  }
}

User.init(
  {
    username: {
      type: S.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: S.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: S.STRING,
    },
    favorites: {
      type: S.ARRAY(S.INTEGER),
      defaultValue: [],
    },
    salt: {
      type: S.STRING,
    },
    refreshT: {
      type: S.STRING,
    },
  },
  { sequelize: db, modelName: "users" }
);

User.addHook("beforeCreate", (user) => {
  user.salt = bcrypt.genSaltSync(8);
  return user
    .hashPassword(user.password, user.salt)
    .then((hash) => {
      user.password = hash;
    })
    .catch((error) => console.log(error));
});

module.exports = User;
