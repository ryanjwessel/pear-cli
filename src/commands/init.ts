import inquirer from "inquirer";
import chalk from "chalk";
import fs from "fs";
import path from "path";
import { writeContributors } from "../contributors.js";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const { prompt } = inquirer;
const __dirname = dirname(fileURLToPath(import.meta.url));

const createGitIgnore = () => {
  fs.writeFileSync("./.pear/.gitignore", "session", { encoding: "utf-8" });
  console.info(chalk.yellowBright("Created .pear/.gitignore file."));
};

const createPearShellScript = () => {
  fs.copyFileSync(path.join(__dirname, "../pear.sh"), "./.pear/pear.sh");
  console.info(chalk.yellowBright("Created .pear/pear.sh file."));
};

const addContributor = (contributors: string[]) => {
  const questions = [
    {
      type: "input",
      name: "name",
      message: "Please enter the name of a project contributor",
    },
    {
      type: "confirm",
      name: "moreToAdd",
      message: "Would you like to add more contributors?",
    },
  ];

  prompt(questions).then(({ name, moreToAdd }) => {
    contributors.push(name);
    if (moreToAdd) {
      addContributor(contributors);
    } else {
      writeContributors(contributors);
    }
  });
};

export const init = () => {
  console.info(
    chalk.yellowBright("🍐 Thanks for adding Pear to your project!")
  );

  if (!fs.existsSync("./.pear")) {
    console.info(
      chalk.yellowBright("Created .pear directory.")
    );
    fs.mkdirSync("./.pear");
  }

  createGitIgnore();
  createPearShellScript();

  console.info(
    chalk.yellowBright("Let's add contributors to your Pear configuration.")
  );

  const contributors: string[] = [];
  addContributor(contributors);
};
