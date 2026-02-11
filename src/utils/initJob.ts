import { GetAllSkills } from "./SkillsReader";
import { GenerateSkillEmbeddings } from "./GenerateEmbeddings";


export const InitJob = async () => {
    const skills = GetAllSkills();
    const embeddings = await GenerateSkillEmbeddings(skills);
    return embeddings;
}
