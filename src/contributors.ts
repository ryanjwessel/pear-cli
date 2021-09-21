import chalk from 'chalk';
import fs from "fs";

export const getContributors = () => {
  if (fs.existsSync("./.pear/contributors")) {
    return fs.readFileSync("./.pear/contributors", "utf-8").split("\n");
  } else {
    throw new Error(
      "Could not find .pear/contributors. Run `pear init` to set this project up for use with the Pear CLI."
    );
  }
};

export const writeContributors = (contributors: string[]) => {
  fs.writeFileSync("./.pear/contributors", contributors.join("\n"), {
    encoding: "utf-8",
  });
  console.info(chalk.yellowBright("Updated .pear/contributors file."));
};