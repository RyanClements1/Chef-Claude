import express from "express";
import cors from "cors";
import Anthropic from "@anthropic-ai/sdk";

const app = express();

const { ANTHROPIC_API_KEY, FRONTEND_URL } = process.env;

if (!ANTHROPIC_API_KEY || !FRONTEND_URL) {
  throw new Error("ANTHROPIC_API_KEY and FRONTEND_URL must be configured.");
}

app.use(cors({
  origin: FRONTEND_URL,
  methods: ["GET", "POST"]
}));

app.use(express.json({ limit: "10kb" }));

const anthropic = new Anthropic({
  apiKey: ANTHROPIC_API_KEY,
  timeout: 45000,
  maxRetries: 0
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/recipe", async (req, res) => {
  const ingredients = req.body?.ingredients;

  if (
    !Array.isArray(ingredients) ||
    ingredients.length < 1 ||
    ingredients.length > 50 ||
    ingredients.some(
      item =>
        typeof item !== "string" ||
        item.trim().length === 0 ||
        item.length > 100
    )
  ) {
    return res.status(400).json({
      error: "Provide between 1 and 50 valid ingredients."
    });
  }

  try {
    const message = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 1024,
      system:
    "You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page",      
    messages: [
        {
          role: "user",
          content: `Suggest a recipe using: ${ingredients
            .map(item => item.trim())
            .join(", ")}`
        }
      ]
    });

    const recipe = message.content
      .filter(block => block.type === "text")
      .map(block => block.text)
      .join("\n");

    res.set("Cache-Control", "no-store");
    res.json({ recipe });
  } catch (error) {
    console.error("Recipe request failed. Status:", error.status);
    res.status(502).json({
      error: "Could not generate a recipe. Please try again."
    });
  }
});

const port = Number(process.env.PORT) || 8080;

app.listen(port, "0.0.0.0", () => {
  console.log(`Server listening on port ${port}`);
});