import chalk from "chalk";
import { existsSync, mkdirSync, writeFileSync, copyFileSync } from "fs";
import path from 'path';
import { prompt } from "inquirer";
import { pear } from "../cli";

const createContributorsFile = (contributors: string[]) => {
  console.info(chalk.yellowBright("Creating .pear/contributors now"));
  writeFileSync("./.pear/contributors", contributors.join("\n"), {
    encoding: "utf-8",
  });
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

const createGitIgnore = () => {
  console.info(chalk.yellowBright("Creating .pear/.gitignore now"));
  writeFileSync("./.pear/.gitignore", "session", { encoding: "utf-8" });
};

const createPearShellScript = () => {
  console.info(chalk.yellowBright("Creating .pear/pear.sh now"));
  copyFileSync(path.join(__dirname, "../pear.sh"), "./.pear/pear.sh",);
};

pear
  .command("init")
  .description("Initialize Pear in your project")
  .action(() => {
    console.info(
      chalk.yellowBright("🍐 Thanks for adding Pear to your project!")
    );

    if (!existsSync("./.pear")) {
      console.info(
        chalk.yellowBright(".pear directory not found, creating it now.")
      );
      mkdirSync("./.pear");
    }

    createGitIgnore();
    createPearShellScript();

    console.info(
      chalk.yellowBright("Let's add contributors to your Pear configuration.")
    );

    const contributors: string[] = [];
    addContributor(contributors);
  });
