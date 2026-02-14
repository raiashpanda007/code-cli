import { GeminiEmbeddings } from "./GenerateEmbeddings";

export function cosineSimilarity(a: number[], b: number[]): number {
    if (a.length !== b.length) {
        throw new Error("Vectors must be of the same length");
    }

    let dot = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < a.length; i++) {
        const valA = a[i];
        const valB = b[i];

        if (valA === undefined || valB === undefined) continue;

        dot += valA * valB;
        normA += valA * valA;
        normB += valB * valB;
    }

    return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}




export async function MatchSkills(query: string, embeddings: Record<string, number[]>): Promise<{
    skills: { skill: string; similarity: number }[];
    userQuery: string;
    similarity: number;
}> {
    const queryEmbedding = await GeminiEmbeddings.embedQuery(query);
    const similarities = Object.entries(embeddings).map(([skill, embedding]) => {
        const similarity = cosineSimilarity(queryEmbedding, embedding);
        return { skill, similarity };
    });
    const sortedSimilarities = similarities.sort((a, b) => b.similarity - a.similarity);

    const bestMatch = sortedSimilarities[0];

    if (bestMatch && bestMatch.similarity > 0.7) {
        return {
            skills: [bestMatch],
            userQuery: query,
            similarity: bestMatch.similarity
        }
    } else {
        return {
            skills: [],
            userQuery: query,
            similarity: bestMatch ? bestMatch.similarity : 0
        }
    }
}




