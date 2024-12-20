const mongoose = require("mongoose");
const ClothingItem = require("../models/clothingItem");

const {
  BAD_REQUEST_ERROR,
  FORBIDDEN_ERROR,
  NOT_FOUND_ERROR,
  INTERNAL_SERVER_ERROR,
} = require("../utils/errors");

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// CRUD (Create, Read, Update, Delete)

// Create Item
const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  if (!req.user || !req.user._id) {
    return res
      .status(BAD_REQUEST_ERROR)
      .send({ message: "User is not authenticated." });
  }

  const owner = req.user._id;

  return ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST_ERROR).send({
          message:
            "Error creating item - ensure there is a valid name (2 to 30 characters), a valid weather type ('hot', 'warm', or 'cold'), a valid image URL, and a valid owner ID.",
        });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error occurred on the server." });
    });
};

// Read Items
const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      console.error(err);
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error occurred on the server." });
    });
};

// Like Item (Update Method)
const likeItem = (req, res) => {
  const { itemId } = req.params;

  if (!isValidObjectId(itemId)) {
    return res.status(BAD_REQUEST_ERROR).send({ message: "Invalid item ID." });
  }

  return ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((item) => {
      if (!item) {
        return res.status(NOT_FOUND_ERROR).send({ message: "Item not found." });
      }
      return res.status(200).send(item);
    })
    .catch((err) => {
      console.error(err);
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error occurred on the server." });
    });
};

// Delete Item (Delete Method #1)
const deleteItem = (req, res) => {
  const { itemId } = req.params;

  if (!isValidObjectId(itemId)) {
    return res.status(BAD_REQUEST_ERROR).send({ message: "Invalid item ID." });
  }

  return ClothingItem.findById(itemId)
    .then((item) => {
      if (!item) {
        return res.status(NOT_FOUND_ERROR).send({ message: "Item not found." });
      }
      if (item.owner.toString() !== req.user._id) {
        return res
          .status(FORBIDDEN_ERROR)
          .send({ message: "You do not have permission to delete this item." });
      }

      return ClothingItem.findByIdAndDelete(itemId).then(() =>
        res.status(200).send({ message: "Item deleted successfully." })
      );
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST_ERROR)
          .send({ message: "Invalid item ID." });
      }

      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error occured on the server" });
    });
};

// Unlike Item (Delete Method #2)
const unlikeItem = (req, res) => {
  const { itemId } = req.params;

  if (!isValidObjectId(itemId)) {
    return res.status(BAD_REQUEST_ERROR).send({ message: "Invalid item ID." });
  }

  return ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((item) => {
      if (!item) {
        return res.status(NOT_FOUND_ERROR).send({ message: "Item not found." });
      }
      return res.status(200).send(item);
    })
    .catch((err) => {
      console.error(err);
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error occurred on the server." });
    });
};

module.exports = {
  createItem,
  getItems,
  likeItem,
  deleteItem,
  unlikeItem,
};
