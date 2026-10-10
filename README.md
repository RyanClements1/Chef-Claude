# Chef Claude 🍳

Chef Claude is a React recipe generator that suggests meals based on ingredients you have on hand. Add ingredients to your list, request an AI-generated recipe, and read the result in a clean, formatted layout.

## Features

- **Ingredient list:** Add ingredients using a simple form and see your list update immediately.
- **Recipe generation:** Click **Get a recipe** once you have at least four ingredients. The current app calls Anthropic's Claude API to suggest a meal.
- **Readable results:** Generated recipe text is rendered using React Markdown.
- **Smooth navigation:** The page scrolls toward the recipe section when a response arrives.

## Tech Stack and Dependencies

| Technology | Purpose | Link |
| --- | --- | --- |
| React | Interface components and state management | [React](https://react.dev/) |
| React DOM | Render the application in the browser | [react-dom on npm](https://www.npmjs.com/package/react-dom) |
| JavaScript | Application logic | [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide) |
| Vite | Development server and build tool | [Vite](https://vite.dev/) |
| Vite React Plugin | React support for Vite | [@vitejs/plugin-react on npm](https://www.npmjs.com/package/@vitejs/plugin-react) |
| Anthropic SDK | Claude-based recipe generation | [@anthropic-ai/sdk on npm](https://www.npmjs.com/package/@anthropic-ai/sdk) |
| React Markdown | Render formatted recipe responses | [react-markdown on npm](https://www.npmjs.com/package/react-markdown) |

All JavaScript packages and their version requirements are listed in [`package.json`](./package.json).

## Requirements

- [Node.js](https://nodejs.org/en/download) (includes npm). Use a current Node.js LTS release compatible with your Vite version.
- A terminal, such as the built-in terminal in [Visual Studio Code](https://code.visualstudio.com/).

Check that Node.js and npm are installed:

```bash
node --version
npm --version
```

## Installation

1. Download or clone this repository and open a terminal in the **ChefClaude** project folder (the folder containing `package.json`).
2. Install **all required dependencies**:

   ```bash
   npm install
   ```

   This installs React, React DOM, Vite, React Markdown, the Anthropic SDK, and the Vite React plugin based on `package.json`. You do **not** need to install each package separately.

3. Start the Vite development server:

   ```bash
   npm start
   ```

   Or use the equivalent command:

   ```bash
   npm run dev
   ```

4. Open the local URL printed in the terminal (often `http://localhost:5173/`).

> **Important note about local AI functionality:** This is a Scrimba-origin project. Its current `ai.js` reads `process.env.ANTHROPIC_API_KEY` and `process.env.HF_ACCESS_TOKEN` and uses `dangerouslyAllowBrowser: true`. Standard Vite browser projects do not automatically provide these `process.env` values, so the project may show a `process is not defined` error or fail to generate recipes when run locally as-is. **Installing packages alone does not fix this.** To run AI recipe generation outside Scrimba, move API requests and credentials to a secure backend/serverless endpoint and update the frontend to call that endpoint. Do not publish API keys or place them in browser-exposed `VITE_` variables.

Learn more: [Vite environment variables](https://vite.dev/guide/env-and-mode) · [Anthropic API documentation](https://docs.anthropic.com/) · [Anthropic SDK](https://github.com/anthropics/anthropic-sdk-typescript).

## How to Use

1. Type an ingredient into the input field and click **Add ingredient**.
2. Repeat until the list contains at least four ingredients. The provided app initially includes a few sample ingredients.
3. Click **Get a recipe**.
4. When the Claude API is correctly configured, the suggested recipe will appear below the ingredients.

## Available Commands

| Command | Description |
| --- | --- |
| `npm install` | Install the dependencies defined in `package.json` |
| `npm start` | Start the Vite development server |
| `npm run dev` | Start the same development server |
| `npm run build` | Build the frontend for production |
| `npm run preview` | Preview the built frontend locally |

**Deployment warning:** A production build does not make the current browser-side API-key handling safe. Configure a secure backend before publishing the AI functionality.

## Project Structure

```text
ChefClaude/
├── components/
│   ├── ClaudeRecipe.jsx      # Displays Markdown recipe results
│   ├── Header.jsx            # App header and logo
│   ├── IngredientsList.jsx   # List and recipe request button
│   └── Main.jsx              # Ingredient state and recipe generation
├── images/
│   └── chef-claude-icon.png
├── ai.js                      # Claude requests
├── App.jsx                    # Main application component
├── index.css                  # Styling
├── index.html                 # HTML entry point
├── index.jsx                  # React rendering entry point
├── package.json               # Dependencies and npm scripts
├── recipeCode.md              # Example recipe markup
├── vite.config.js             # Vite configuration
└── README.md
```

## Potential Improvements

- Route AI requests through a backend so credentials remain private.
- Add loading, error, and empty-input states.
- Allow users to remove ingredients or reset the list.
- Add options for dietary preferences or recipe types.

## Learning Resources

- [React documentation](https://react.dev/learn)
- [Vite guide](https://vite.dev/guide/)
- [React Markdown project](https://github.com/remarkjs/react-markdown)
- [Anthropic API documentation](https://docs.anthropic.com/)
