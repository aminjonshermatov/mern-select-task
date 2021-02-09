const { Router } = require("express");
const path = require("path");

const countries = require(path.join(__dirname, "../", "controllers", "countries.controller.js"));

const router = Router();

router.get("/get", countries.get);

router.get("/getById", countries.getById);

module.exports = router;
