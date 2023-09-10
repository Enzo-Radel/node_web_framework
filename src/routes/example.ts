// import expres from "express";

const express = require("express");
const { exampleView, exampleView2 } =  require("../controllers/exampleController");
const router = express.Router();

router.get("/", exampleView);
router.get("/2", exampleView2);

module.exports = router;