# Code CLI 🚀

Code CLI is an intelligent command-line tool designed to assist with various coding tasks by leveraging Large Language Models (LLMs) and a modular "Shape" system known as **Skills**.

It understands your natural language requests, matches them to the most relevant specialized skill in its library, and uses state-of-the-art AI to generate the appropriate output or solution.

## ✨ Features

- **Smart Skill Matching**: Automatically finds the best tool for the job based on your semantic query.
- **LLM Integration**: Powered by Claude 3.5 Sonnet (via OpenRouter) for high-quality reasoning and code generation.
- **Modular Architecture**: easily extensible by adding new Markdown-based skill definitions to the `skills/` directory.
- **Rich Terminal UI**: formatted Markdown output directly in your console.

## 🔄 How It Works (The Flow)

The application follows a streamlined process to handle your requests:

1.  **Initialization**:
    - On startup, the CLI scans the `skills/` directory.
    - It reads all `SKILL.md` files and generates/loads embeddings for their descriptions to understand what each skill does.

2.  **User Input**:
    - You are prompted to describe the task you want to perform (e.g., "Create a fast API endpoint" or "Explain this regex").

3.  **Semantic Matching**:
    - Your input is analyzed and compared against the embeddings of all available skills.
    - The system selects the skill with the highest usage probability.

4.  **Context Construction**:
    - Once a skill is selected, the **entire content** of its `SKILL.md` file is loaded.
    - This content acts as a specialized "System Prompt" or context for the AI, giving it specific rules, templates, and knowledge for that particular domain.

5.  **Execution (LLM Call)**:
    - The selected skill context and your original prompt are sent to the LLM.
    - The AI processes the request within the constraints of the skill.

6.  **Output**:
    - The response is streamed back and rendered beautifully in your terminal using Markdown formatting.

## 🛠️ Installation & Setup

### Prerequisites
- [Bun](https://bun.com) (v1.3.1 or higher)
- An OpenRouter API Key
    ```
        git clone https://github.com/raiashpanda007/code-cli
        cd code-cli
   ``` 

2.  **Install dependencies**:
    
    bun install
    

3.  **Configure Environment**:
    Create a `.env` file in the root directory and add your OpenRouter API key:
    ```env
    OPENROUTER_API_KEY=sk-or-v1-your-key-here...
    ```
    *(Note: Ensure you have `Cfg` setup in `src/config/env.ts` to read this variable used in `src/LLM/LlmCall.ts`)*

## 🚀 Usage

To start the CLI:

```bash
bun run index.ts
```

Follow the interactive prompts to describe your task!

## 🧩 Adding New Skills

You can extend the CLI's capabilities by adding new skills.

1.  Create a new folder in `skills/` (e.g., `skills/python-expert/`).
2.  Add a `SKILL.md` file inside that folder.
3.  Use the recommended Frontmatter format:

    ```markdown
    ---
    name: Python Expert
    description: A skill for writing idiomatic and efficient Python code.
    ---

    # Python Expert Instructions
    You are an expert Python developer. When asked to write code...
    ...
    ```

The CLI will automatically pick up this new skill on the next run!
