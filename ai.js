const BACKEND_URL = "https://chef-claude-api-327153236248.northamerica-northeast1.run.app"

export async function getRecipeFromChefClaude(ingredientsArr) {
    const response = await fetch(`${BACKEND_URL}/api/recipe`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ingredients: ingredientsArr
        })
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.error || "Could not generate a recipe.")
    }

    return data.recipe
}