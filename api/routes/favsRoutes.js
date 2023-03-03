const express = require("express");
const router = express.Router();
const auth = require("../middlewares/verifyToken");
const {
  setFavorite,
  deleteFavorite,
  allFavs,
} = require("../controllers/favoriteController");

//Get Favorites
router.get("/:username", (req, res) => {
  allFavs(req, res);
});

//Add to Favorite
router.post("/:id", (req, res) => {
  setFavorite(req, res);
});

//Delete a favorite
router.delete("/:id", (req, res) => {
  deleteFavorite(req, res);
});

module.exports = router;
