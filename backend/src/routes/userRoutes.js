const express = require("express");

const {createUserWithAstrologyProfile,} = require("../controllers/userController");

const router = express.Router();

router.post("/register", createUserWithAstrologyProfile);

module.exports = router;