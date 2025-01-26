const router = require("express").Router();

const {
  createItem,
  getItems,
  likeItem,
  deleteItem,
  unlikeItem,
} = require("../controllers/clothingItems.js");

const auth = require("../middlewares/auth.js");

// CRUD (Create, Read, Update, Delete)

// Create (POST /items route)
router.post("/", auth, createItem);

// Read (GET /items route)
router.get("/", getItems);

// Update (PUT /items/:itemId/likes route)
router.put("/:itemId/likes", auth, likeItem);

// Delete Method #1 (DELETE /items/:itemId route)
router.delete("/:itemId", auth, deleteItem);

// Delete Method #2 (DELETE /items/:itemId/likes route)
router.delete("/:itemId/likes", auth, unlikeItem);

module.exports = router;
