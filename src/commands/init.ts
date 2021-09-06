import inquirer from "inquirer";
import chalk from "chalk";
import fs from "fs";
import path from "path";
import { writeContributors } from "../contributors.js";

const { prompt } = inquirer;

const createGitIgnore = () => {
  console.info(chalk.yellowBright("Creating .pear/.gitignore now"));
  fs.writeFileSync("./.pear/.gitignore", "session", { encoding: "utf-8" });
};

const createPearShellScript = () => {
  console.info(chalk.yellowBright("Creating .pear/pear.sh now"));
  fs.copyFileSync(path.join(__dirname, "../pear.sh"), "./.pear/pear.sh");
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
      chalk.yellowBright(".pear directory not found, creating it now.")
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
