import inquirer from 'inquirer';
import chalk from 'chalk';

export async function askQuestion(question: string): Promise<string> {
    const { answer } = await inquirer.prompt<{ answer: string }>([
        {
            type: 'input',
            name: 'answer',
            message: chalk.cyan(question),
            validate: (input) => input.trim() !== '' ? true : 'Response cannot be empty',
        },
    ]);

    return answer;
}
