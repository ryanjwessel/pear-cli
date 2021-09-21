import chalk from "chalk";
import fs from "fs";

export const end = () => {
  fs.unlink("./.pear/session", (err) => {
    if (err) {
      console.error(err);
      console.error(chalk.redBright("Could not remove Pear's session file."));
      return;
    }
    console.info(chalk.yellowBright("Ended pairing session."));
  });
};
