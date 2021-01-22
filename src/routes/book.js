const express = require("express");
const bookController = require("../controller/book");

const router = express.Router();

router.get("/", bookController.retrieveAllBook);

router.get("/:id", bookController.retrieveById);

router.post("/", bookController.createBook);

router.put("/:id", bookController.updateBook);

router.delete("/:id", bookController.deleteBook);

module.exports = router;
