const express = require("express");
const userController = require("../controller/user");

const router = express.Router();

router.get("/", userController.retrieveAllUser);

router.get("/:id", userController.retrieveById);

router.post("/", userController.createUser);

router.put("/:id", userController.updateUser);

router.delete("/:id", userController.deleteUser);

module.exports = router;
