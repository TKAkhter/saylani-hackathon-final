const { successResponse, failResponse } = require("../helpers/methods")
const { Configuration, OpenAIApi } = require("openai")
require("dotenv").config()

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.getPrompt = async (req, res) => {
    try {
        const { question } = req.body
        const openai = new OpenAIApi(configuration)
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: question }]
        })
        
        console.log("🚀 ~ file: chat-bot.js:24 ~ exports.getPrompt= ~ completion.data.choices:", completion.data.choices);
        res.send(
            successResponse({
                data: completion.data.choices[0],
                request: req.body
            })
        )
    } catch (error) {
        res.send(
            failResponse({
                data: error.message,
                request: req.body
            })
        )
    }
}
