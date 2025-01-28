const router = require("express").Router();

const {
  createItem,
  getItems,
  likeItem,
  deleteItem,
  unlikeItem,
} = require("../controllers/clothingItems");

const auth = require("../middlewares/auth");

const {
  validateCreateItem,
  validateItemId,
} = require("../middlewares/validation");

// CRUD (Create, Read, Update, Delete)

// Create (POST /items route)
router.post("/", auth, validateCreateItem, createItem);

// Read (GET /items route)
router.get("/", getItems);

// Update (PUT /items/:itemId/likes route)
router.put("/:itemId/likes", auth, validateItemId, likeItem);

// Delete Method #1 (DELETE /items/:itemId route)
router.delete("/:itemId", auth, validateItemId, deleteItem);

// Delete Method #2 (DELETE /items/:itemId/likes route)
router.delete("/:itemId/likes", auth, validateItemId, unlikeItem);

module.exports = router;
