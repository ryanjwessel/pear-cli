import { pear } from "../cli";
import { getContributors, writeContributors } from "../contributors";

pear
  .command("add")
  .description("Add a contributor from your Pear configuration")
  .argument("<contributor>", "The name of the contributor you are adding")
  .action((addition: string) => {
    const contributors = getContributors();
    contributors.push(addition);
    writeContributors(contributors);
  });
