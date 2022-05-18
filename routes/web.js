const express = require("express");
const router = express.Router();
const HomeController = require("../app/controllers/HomeController");

router.get("/", HomeController.homePage);
router.post("/Add", HomeController.add);
router.post("/GetRecommend", HomeController.GetRecommend);

module.exports = router;
