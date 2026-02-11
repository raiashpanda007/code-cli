import { program } from 'commander';
import chalk from 'chalk';
import { askQuestion } from './src/prompts';
import { InitJob } from './src/utils/initJob';
import { MatchSkills } from './src/utils/SkillMatcher';




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

        const task = await askQuestion('What task would you like to do?');

        console.log(chalk.dim('-----------------------------------'));
        console.log(chalk.green(`✔ You entered: ${chalk.bold(task)}`));
        console.log(chalk.dim('-----------------------------------'));

        const matchedSkills = await MatchSkills(task, embeddings);
        console.log(chalk.green(`✔ Matched Skills: ${chalk.bold(matchedSkills.skills.map(skill => skill.skill).join(', '))}`));
        console.log(chalk.dim('-----------------------------------'));



    } catch (error) {
        console.error(chalk.red('\nAn error occurred:'), error);
    }
}

main();