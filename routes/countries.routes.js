const { Router } = require("express");

const countries = require("../controllers/countries.controller");

const router = Router();

router.get("/get", countries.get);

router.get("/getById", countries.getById);

module.exports = router;
