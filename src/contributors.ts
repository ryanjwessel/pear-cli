import chalk from 'chalk';
import { existsSync, readFileSync, writeFileSync } from "fs";

export const getContributors = () => {
  if (existsSync("./.pear/contributors")) {
    return readFileSync("./.pear/contributors", "utf-8").split("\n");
  } else {
    throw new Error(
      "Could not find .pear/contributors. Run `pear init` to set this project up for use with the Pear CLI."
    );
  }
};

export const writeContributors = (contributors: string[]) => {
  console.info(chalk.yellowBright("Updating .pear/contributors"));
  writeFileSync("./.pear/contributors", contributors.join("\n"), {
    encoding: "utf-8",
  });
};