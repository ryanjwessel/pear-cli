import { writeFileSync } from "fs";
import inquirer from "inquirer";
import chalk from "chalk";
import { getContributors } from "../contributors.js";

const { prompt } = inquirer;

const createSessionFile = (pairs: string[]) => {
  writeFileSync("./.pear/session", pairs.join("\n"), { encoding: "utf-8" });
  console.info(chalk.yellowBright("Created ./.pear/session file."));
};

export const start = () => {
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
};
