const express = require("express");
const {body} = require("express-validator");
const router = express.Router();
const validationError = require('../errors/validationError');

router.get("/car", async(req, res) => {
    res.send("Hello world");
});

module.exports = router;