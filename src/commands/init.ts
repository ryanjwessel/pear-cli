import chalk from "chalk";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { prompt } from "inquirer";
import { pear } from "../cli";

const createContributorsFile = (contributors: string[]) => {
    console.info(chalk.yellow("Creating contributors file now"));
    writeFileSync("./.pear/contributors", contributors.join("\n"), { encoding: 'utf-8' });
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
        createContributorsFile(contributors);
      }
    });
  };

pear
  .command("init")
  .description("Initialize Pear in your project")
  .action(() => {
    console.info(chalk.yellow("🍐 Thanks for adding Pear to your project!"));

    if (!existsSync("./.pear")) {
      console.info(chalk.yellow(".pear directory not found, creating it now."));
      mkdirSync("./.pear");
    }

    console.info(
      chalk.yellow("Let's add contributors to your Pear configuration.")
    );

    const contributors: string[] = [];
    addContributor(contributors);
  });
