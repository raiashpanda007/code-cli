import fs from "fs";
import path from "path";

const SKILLS_DIR = "./skills";

export const GetAllSkills = () => {
    const skills: { name: string; description: string }[] = [];

    if (!fs.existsSync(SKILLS_DIR)) return skills;

    fs.readdirSync(SKILLS_DIR).forEach(file => {
        const skillFilePath = path.join(SKILLS_DIR, file, "SKILL.md");
        if (fs.existsSync(skillFilePath)) {
            const content = fs.readFileSync(skillFilePath, "utf-8");

            const match = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n/);
            if (match && match[1]) {
                const frontmatter = match[1];
                const nameMatch = frontmatter.match(/name:\s*(.+)/);
                const descMatch = frontmatter.match(/description:\s*(.+)/);

                if (nameMatch && descMatch) {
                    skills.push({
                        name: nameMatch[1]!.trim(),
                        description: descMatch[1]!.trim()
                    });
                    return;
                }
            }

            const lines = content.split("\n").filter(line => line.trim() !== "");
            if (lines.length > 0) {

                skills.push({
                    name: lines[0]!.replace(/^#+\s*/, "").trim(),
                    description: lines.slice(1).join(" ").trim()
                });
            }

        }
    });
    return skills;
};

export const GetSkill = (skillName: string) => {
    const skillFilePath = path.join(SKILLS_DIR, skillName, "SKILL.md");
    if (!fs.existsSync(skillFilePath)) return null;
    const content = fs.readFileSync(skillFilePath, "utf-8");
    const lines = content.split("\n").filter(line => line.trim() !== "");
    if (lines.length > 0) {
        return {
            name: lines[0]!.replace(/^#+\s*/, "").trim(),
            description: lines.slice(1).join(" ").trim()
        };
    }
    return null;
};  