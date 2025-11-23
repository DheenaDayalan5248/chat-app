const express = require("express");
const { getMadeBy, updateMadeBy } = require("../controllers/madeByController");

const router = express.Router();

router.route("/").get(getMadeBy).post(updateMadeBy);

module.exports = router;
