const express = require("express");
const { fetchAndSaveJoke, getJokes, updateJoke, deleteJoke } = require("../api/piada");
const auth = require("../middleware/authMiddleware");
const permissionMiddleware = require("../middleware/permissionMiddleware");

const router = express.Router();

router.get("/", auth(), getJokes);

router.post("/", auth(), permissionMiddleware('admin'), fetchAndSaveJoke);

router.put("/:id", auth(), permissionMiddleware('admin'), updateJoke);

router.delete("/:id", auth(), permissionMiddleware('admin'), deleteJoke);

module.exports = router;
