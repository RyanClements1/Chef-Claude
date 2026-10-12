import express from "express"
import cors from "cors"
import Anthropic from "@anthropic-ai/sdk"

const app = express()

if (!process.env.ANTHROPIC_API_KEY || !process.env.FRONTEND_URL) {
    throw new Error("Required server configuration is missing.")
}

app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"]
}))

app.use(express.json({ limit: "10kb" }))

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
    timeout: 45000,
    maxRetries: 0
})

const SYSTEM_PROMPT = `You are an assistant that receives a list of 
ingredients that a user has and suggests a recipe they could 
make with some or all of those ingredients. You don't need to use every ingredient 
they mention in your recipe. The recipe can include additional ingredients they didn't mention, 
but try not to include too many extra ingredients. Format your response in markdown to make it 
easier to render to a web page`

app.get("/health", (req, res) => {
    res.json({ status: "ok" })
})

app.post("/api/recipe", async (req, res) => {
    const ingredients = req.body?.ingredients

    if (
        !Array.isArray(ingredients) ||
        ingredients.length === 0 ||
        ingredients.length > 50 ||
        ingredients.some(
            item =>
                typeof item !== "string" ||
                item.trim().length === 0 ||
                item.length > 100
        )
    ) {
        return res.status(400).json({
            error: "Please provide between 1 and 50 valid ingredients."
        })
    }

    try {
        const message = await anthropic.messages.create({
            model: "claude-haiku-4-5",
            max_tokens: 1024,
            system: SYSTEM_PROMPT,
            messages: [
                {
                    role: "user",
                    content: `Suggest a recipe using: ${
                        ingredients.join(", ")
                    }`
                }
            ]
        })

        const recipe = message.content
            .filter(block => block.type === "text")
            .map(block => block.text)
            .join("\n")

        res.set("Cache-Control", "no-store")
        res.json({ recipe })
    } catch (error) {
        console.error("Claude request failed", {
            status: error.status
        })

        res.status(502).json({
            error: "Could not generate a recipe. Please try again."
        })
    }
})

const port = Number(process.env.PORT) || 8080

app.listen(port, "0.0.0.0", () => {
    console.log(`Backend listening on port ${port}`)
})