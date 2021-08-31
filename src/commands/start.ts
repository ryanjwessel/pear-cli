import { existsSync, readFileSync, writeFileSync } from "fs";
import { prompt } from "inquirer";
import chalk from "chalk";
import { pear } from "../cli";

const getContributors = () => {
    if (existsSync('./.pear/contributors')) {
        return readFileSync("./.pear/contributors", "utf-8").split("\n")
    } else {
        throw new Error('Could not find .pear/contributors. Run `pear init` to set this project up for use with the Pear CLI.');
    }
};

const createSessionFile = (pairs: string[]) => {
  console.info(chalk.yellowBright("Creating pairing session file now"));
  writeFileSync("./.pear/session", pairs.join("\n"), { encoding: "utf-8" });
};


pear
  .command("start")
  .description("Start a pair programming session")
  .action(() => {
    console.info(
      chalk.yellowBright("Let's add some pairs to your current session.")
    );

    const contributors = getContributors();

    prompt([
      {
        type: "checkbox",
        name: "pairs",
        message:
          "Please select the contributors you will be pairing with in this session.",
        choices: contributors,
      },
    ]).then(({ pairs }) => {
      createSessionFile(pairs);
    });
  });
