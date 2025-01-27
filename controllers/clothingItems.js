const mongoose = require("mongoose");
const ClothingItem = require("../models/clothingItem.js");

const {
  BAD_REQUEST_ERROR,
  FORBIDDEN_ERROR,
  NOT_FOUND_ERROR,
  INTERNAL_SERVER_ERROR,
} = require("../utils/errors.js");

const BadRequestError = require("../errors/BadRequestError.js");
const ForbiddenError = require("../errors/ForbiddenError.js");
const NotFoundError = require("../errors/NotFoundError.js");

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// CRUD (Create, Read, Update, Delete)

// Create (POST /items route)
const createItem = (request, response, next) => {
  const { name, weather, imageUrl } = request.body;
  const owner = request.user?._id;

  if (!name || !weather || !imageUrl) {
    return next(
      new BadRequestError("Missing required fields for item creation.")
    );
  }

  if (!request.user || !request.user._id) {
    return next(new BadRequestError("User is not authenticated."));
  }

  return ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => response.status(201).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        next(
          new BadRequestError(
            "Error creating item. Invalid data. Ensure there is a valid name (2 to 30 characters), a valid weather type ('hot', 'warm', or 'cold'), a valid image URL, and a valid owner ID."
          )
        );
      } else {
        next(err);
      }
    });
};

// Read (GET /items route)
const getItems = (request, response, next) => {
  ClothingItem.find({})
    .then((items) => response.status(200).send(items))
    .catch((err) => {
      console.error(err);
      return next(err);
    });
};

// Update (PUT /items/:itemId/likes route)
const likeItem = (request, response, next) => {
  const { itemId } = request.params;

  if (!itemId) {
    return next(new BadRequestError("Missing item ID."));
  }

  if (!isValidObjectId(itemId)) {
    return next(new BadRequestError("Invalid item ID."));
  }

  return ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: request.user._id } },
    { new: true }
  )
    .then((item) => {
      if (!item) {
        return next(new NotFoundError("Item not found."));
      }
      return response.status(200).send(item);
    })
    .catch((err) => {
      console.error(err);
      return next(err);
    });
};

// Delete Method #1 (DELETE /items/:itemId route)
const deleteItem = (request, response, next) => {
  const { itemId } = request.params;

  if (!itemId) {
    return next(new BadRequestError("Missing item ID."));
  }

  if (!isValidObjectId(itemId)) {
    return next(new BadRequestError("Invalid item ID."));
  }

  return ClothingItem.findById(itemId)
    .then((item) => {
      if (!item) {
        return next(new NotFoundError("Item not found."));
      }
      if (item.owner.toString() !== request.user._id) {
        return next(
          new ForbiddenError("You do not have permission to delete this item.")
        );
      }

      return ClothingItem.findByIdAndDelete(itemId).then(() =>
        response.status(200).send({ message: "Item deleted successfully." })
      );
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid item ID."));
      }

      return next(err);
    });
};

// Delete Method #2 (DELETE /items/:itemId/likes route)
const unlikeItem = (request, response, next) => {
  const { itemId } = request.params;

  if (!itemId) {
    return next(new BadRequestError("Missing item ID."));
  }

  if (!isValidObjectId(itemId)) {
    return next(new BadRequestError("Invalid item ID."));
  }

  return ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: request.user._id } },
    { new: true }
  )
    .then((item) => {
      if (!item) {
        return next(new NotFoundError("Item not found."));
      }
      return response.status(200).send(item);
    })
    .catch((err) => {
      console.error(err);
      return next(err);
    });
};

module.exports = {
  createItem,
  getItems,
  likeItem,
  deleteItem,
  unlikeItem,
};
