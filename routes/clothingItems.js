const router = require("express").Router();

const {
  createItem,
  getItems,
  likeItem,
  deleteItem,
  unlikeItem,
} = require("../controllers/clothingItems");

const auth = require("../middlewares/auth");

// CRUD (Create, Read, Update, Delete)

// Create
router.post("/", auth, createItem);

// Read
router.get("/", getItems);

// Update
router.put("/:itemId/likes", auth, likeItem);

// Delete
router.delete("/:itemId", auth, deleteItem);
router.delete("/:itemId/likes", auth, unlikeItem);

module.exports = router;
