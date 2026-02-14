import { program } from 'commander';
import chalk from 'chalk';
import { askQuestion } from './src/prompts';
import { InitJob } from './src/utils/initJob';
import { MatchSkills } from './src/utils/SkillMatcher';
import LLMCall from './src/LLM/LlmCall';


async function main() {
    console.clear();
    console.log(
        chalk.bold.magenta('\n✨ Welcome to the Code CLI! ✨\n')
    );

    program
        .version('1.0.0')
        .description('A basic CLI with chalk and a nice UI');

    try {

        const embeddings = await InitJob();

        while (true) {
            const task = await askQuestion('What task would you like to do?');

            console.log(chalk.dim('-----------------------------------'));
            console.log(chalk.green(`✔ You entered: ${chalk.bold(task)}`));
            console.log(chalk.dim('-----------------------------------'));

            const matchedSkills = await MatchSkills(task, embeddings);

            if (matchedSkills.skills.length > 0) {
                const bestSkill = matchedSkills.skills[0]!.skill;
                console.log(chalk.green(`✔ Matched Skill: ${chalk.bold(bestSkill)}`));
                console.log(chalk.dim('-----------------------------------'));

                console.log(chalk.blue('Calling LLM...'));
                const llmOutput: any = await LLMCall(bestSkill, task);
                console.log(chalk.green('LLM Output:'));
                if (llmOutput.choices && llmOutput.choices.length > 0 && llmOutput.choices[0].message) {
                    console.log(llmOutput.choices[0].message.content);
                } else {
                    console.log(chalk.red('Failed to get a valid response from LLM.'));
                    console.log(JSON.stringify(llmOutput, null, 2));
                }
                break;

            } else {
                console.log(chalk.yellow('⚠ No skill matched with high confidence. Please provide a better description of the skill.'));
                console.log(chalk.dim('-----------------------------------'));
            }
        }

    } catch (error) {
        console.error(chalk.red('\nAn error occurred:'), error);
    }
}

main();