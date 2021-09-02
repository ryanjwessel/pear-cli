import { existsSync, readFileSync } from "fs";

export const getContributors = () => {
  if (existsSync("./.pear/contributors")) {
    return readFileSync("./.pear/contributors", "utf-8").split("\n");
  } else {
    throw new Error(
      "Could not find .pear/contributors. Run `pear init` to set this project up for use with the Pear CLI."
    );
  }
};
