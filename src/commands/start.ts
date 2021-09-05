import { writeFileSync } from "fs";
import { prompt } from "inquirer";
import chalk from "chalk";
import { getContributors } from "../contributors";

const createSessionFile = (pairs: string[]) => {
  console.info(chalk.yellowBright("Creating pairing session file now"));
  writeFileSync("./.pear/session", pairs.join("\n"), { encoding: "utf-8" });
};

export const start = () => {
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
};
