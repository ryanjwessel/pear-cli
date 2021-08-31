import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { prompt } from "inquirer";
import chalk from "chalk";
import { pear } from "../cli";

const contributors = readFileSync('./.pear/contributors', 'utf-8').split('\n');

const createSessionFile = (pairs: string[]) => {
    console.info(chalk.yellow("Creating pairing session file now"));
    writeFileSync("./.pear/session", pairs.join("\n"), { encoding: 'utf-8' });
};

pear
    .command('start')
    .description('Start a pair programming session')
    .action(() => {
        console.info(
            chalk.yellow("Let's add some pairs to your current session.")
        );
      
        prompt([
        {
            type: "checkbox",
            name: "pairs",
            message: "Please select the contributors you will be pairing with in this session.",
            choices: contributors,
        },
        ]).then(({ pairs }) => {
            createSessionFile(pairs);
        });
    })
