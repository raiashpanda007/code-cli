import { config as dotenvConfig } from "dotenv";
import { z as zod } from "zod";

dotenvConfig();

const EnvSchema = zod.object({
    GEMINI_API_KEY: zod.string().min(1),
    OPENROUTER_API_KEY: zod.string().min(1)
});

class Config {
    MustLoad() {
        const parsed = EnvSchema.safeParse(process.env);
        if (!parsed.success) {
            console.error("Invalid environment variables:", parsed.error.format());
            process.exit(1);
        }

        return parsed.data;
    }
}

export default Config;