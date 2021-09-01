import chalk from "chalk";
import { rm } from "fs";
import { pear } from "../cli";

pear
  .command("end")
  .description("End a pair programming session")
  .action(() => {
    rm("./.pear/session", (err) => {
      if (err) {
        console.error(err);
        console.error(chalk.redBright("Could not remove Pear's session file."));
        return;
      }
      console.info(chalk.yellowBright("Successfully ended pairing session."));
    });
  });
