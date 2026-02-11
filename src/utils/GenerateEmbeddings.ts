
import { EMBEDDING_CLIENT } from "../config/GeminiClient";

export const GeminiEmbeddings = {
    embedDocuments: async (texts: string[]): Promise<number[][]> => {
        const response = await EMBEDDING_CLIENT.models.embedContent({
            model: 'gemini-embedding-001',
            contents: [...texts],
        });
        if (!response || !response.embeddings) {
            throw new Error("No embeddings returned");
        }
        return response.embeddings
            .map((embedding) => embedding.values)
            .filter((values): values is number[] => Array.isArray(values));
    },
    embedQuery: async (text: string): Promise<number[]> => {
        const response = await EMBEDDING_CLIENT.models.embedContent({
            model: 'gemini-embedding-001',
            contents: text,
        });
        if (!response || !response.embeddings || !response.embeddings[0]?.values) {
            throw new Error("No embedding returned");
        }
        return response.embeddings[0].values;
    }
}

export const GenerateSkillEmbeddings = async (skills: { name: string; description: string }[]) => {
    const embeddingsMap: Record<string, number[]> = {};

    try {
        const descriptions = skills.map(skill => skill.description);
        const embeddings = await GeminiEmbeddings.embedDocuments(descriptions);

        skills.forEach((skill, i) => {
            if (embeddings[i]) {
                embeddingsMap[skill.name] = embeddings[i];
            }
        });

        console.log(`Generated embeddings for ${skills.length} skills`);
        return embeddingsMap;
    } catch (error) {
        console.error("Error generating skill embeddings:", error);
        throw error;
    }
}


