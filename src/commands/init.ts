import inquirer from "inquirer";
import chalk from "chalk";
import fs from "fs";
import { writeContributors } from "../contributors.js";
import { syncFiles } from "./sync.js";

const { prompt } = inquirer;

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

  syncFiles();

  console.info(
    chalk.yellowBright("Let's add contributors to your Pear configuration.")
  );

  const contributors: string[] = [];
  addContributor(contributors);
};
