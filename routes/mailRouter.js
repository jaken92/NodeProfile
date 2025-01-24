const express = require("express");
const { sendMail } = require("../controllers/mailController");
const router = express.Router();
// import { sendMail } from "../controllers/mailController";

router.post("/", sendMail);

module.exports = router;
