import { Cfg } from "../config/env";
const LLM_URL = 'https://openrouter.ai/api/v1/chat/completions';


async function LLMCall(selectedSkill: string, userPrompt: string) {

    const res = await fetch(LLM_URL, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${Cfg.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: "anthropic/claude-sonnet-4",
            provider: {
                order: ["Anthropic"]
            },
            messages: [
                {
                    role: "system",
                    content: `You are a helpful assistant that generates code snippets based on the user's request. The user has selected the following skills: ${selectedSkill}. Please generate a code snippet that utilizes these skills.`
                },
                {
                    role: "user",
                    content: userPrompt
                }
            ]
        })
    })

    const data = await res.json();

    return data;

}


export default LLMCall;