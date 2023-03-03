const axios = require("axios");
const { User } = require("../models");
require("dotenv").config();

const allFavs = async (req, res) => {
  const username = req.params.username;
  const foundUser = await User.findOne({
    where: { username },
  });
  if (!foundUser) res.sendStatus(401);
  const favoriteIds = foundUser.favorites;

  const favoritePromises = favoriteIds.map((id) => {
    return axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}&language=en-US`
    );
  });

  const favoriteResponses = await Promise.all(favoritePromises);
  const favoriteData = favoriteResponses.map((response) => response.data);

  res.send(favoriteData);

  /*  res.status(200).json({ Favs: favorites }); */
};

const setFavorite = async (req, res) => {
  const favoriteId = req.params.id;

  const foundUser = await User.findOne({
    where: { username: req.body.username },
  });
  if (!foundUser || !favoriteId) res.sendStatus(401);

  const updatedUser = await foundUser.update({
    favorites: [...foundUser.favorites, favoriteId],
  });

  res.status(201).json(updatedUser);
};

const deleteFavorite = async (req, res) => {
  const favoriteId = req.params.id;
  const foundUser = await User.findOne({
    where: { username: req.body.username },
  });
  if (!foundUser || !favoriteId) res.sendStatus(401);

  const updatedFavorites = foundUser.favorites.filter(
    (favorite) => favorite !== Number(favoriteId)
  );
  const updatedUser = await foundUser.update({
    favorites: updatedFavorites,
  });

  res.status(200).json(updatedUser);
};

module.exports = { setFavorite, deleteFavorite, allFavs };
