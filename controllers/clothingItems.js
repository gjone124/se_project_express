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

// Create (POST /items route)
const createItem = (request, response) => {
  const { name, weather, imageUrl } = request.body;

  if (!request.user || !request.user._id) {
    return response
      .status(BAD_REQUEST_ERROR)
      .send({ message: "User is not authenticated." });
  }

  const owner = request.user._id;

  return ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => response.status(201).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return response.status(BAD_REQUEST_ERROR).send({
          message:
            "Error creating item - ensure there is a valid name (2 to 30 characters), a valid weather type ('hot', 'warm', or 'cold'), a valid image URL, and a valid owner ID.",
        });
      }
      return response
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error occurred on the server." });
    });
};

// Read (GET /items route)
const getItems = (request, response) => {
  ClothingItem.find({})
    .then((items) => response.status(200).send(items))
    .catch((err) => {
      console.error(err);
      return response
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error occurred on the server." });
    });
};

// Update (PUT /items/:itemId/likes route)
const likeItem = (request, response) => {
  const { itemId } = request.params;

  if (!isValidObjectId(itemId)) {
    return response
      .status(BAD_REQUEST_ERROR)
      .send({ message: "Invalid item ID." });
  }

  return ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: request.user._id } },
    { new: true }
  )
    .then((item) => {
      if (!item) {
        return response
          .status(NOT_FOUND_ERROR)
          .send({ message: "Item not found." });
      }
      return response.status(200).send(item);
    })
    .catch((err) => {
      console.error(err);
      return response
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error occurred on the server." });
    });
};

// Delete Method #1 (DELETE /items/:itemId route)
const deleteItem = (request, response) => {
  const { itemId } = request.params;

  if (!isValidObjectId(itemId)) {
    return response
      .status(BAD_REQUEST_ERROR)
      .send({ message: "Invalid item ID." });
  }

  return ClothingItem.findById(itemId)
    .then((item) => {
      if (!item) {
        return response
          .status(NOT_FOUND_ERROR)
          .send({ message: "Item not found." });
      }
      if (item.owner.toString() !== request.user._id) {
        return response
          .status(FORBIDDEN_ERROR)
          .send({ message: "You do not have permission to delete this item." });
      }

      return ClothingItem.findByIdAndDelete(itemId).then(() =>
        response.status(200).send({ message: "Item deleted successfully." })
      );
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return response
          .status(BAD_REQUEST_ERROR)
          .send({ message: "Invalid item ID." });
      }

      return response
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error occured on the server" });
    });
};

// Delete Method #2 (DELETE /items/:itemId/likes route)
const unlikeItem = (request, response) => {
  const { itemId } = request.params;

  if (!isValidObjectId(itemId)) {
    return response
      .status(BAD_REQUEST_ERROR)
      .send({ message: "Invalid item ID." });
  }

  return ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: request.user._id } },
    { new: true }
  )
    .then((item) => {
      if (!item) {
        return response
          .status(NOT_FOUND_ERROR)
          .send({ message: "Item not found." });
      }
      return response.status(200).send(item);
    })
    .catch((err) => {
      console.error(err);
      return response
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
