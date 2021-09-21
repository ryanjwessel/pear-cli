import fs from "fs";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";

const __dirname = dirname(fileURLToPath(import.meta.url));

const createGitIgnore = () => {
  fs.writeFileSync("./.pear/.gitignore", "session", { encoding: "utf-8" });
  console.info(chalk.yellowBright("Created .pear/.gitignore file."));
};

const createPrepareCommitMsgScript = () => {
  fs.copyFileSync(
    path.join(__dirname, "../prepare-commit-msg.sh"),
    "./.pear/prepare-commit-msg.sh"
  );
  console.info(chalk.yellowBright("Created .pear/prepare-commit-msg.sh file."));
};

export const syncFiles = () => {
  createGitIgnore();
  createPrepareCommitMsgScript();
};
