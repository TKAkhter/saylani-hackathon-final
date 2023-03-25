const express = require("express")
const router = express.Router()

const IndexController = require("../controllers/index.controller")
const { validate } = require("../middlewares/validators/wrapper.validator")
const { indexValidator } = require("../middlewares/validators/index.validations")

const chatController = require("../controllers/chat-bot")

router.get("/", IndexController.index)
router.post("/", validate(indexValidator), IndexController.indexPost)

router.post("/chat/", chatController.getPrompt)

module.exports = router
