import { pear } from "../cli";
import { getContributors, writeContributors } from "../contributors";

pear
  .command("remove")
  .description("Remove a contributor from your Pear configuration")
  .argument("<contributor>", "The name of the contributor you are removing")
  .action((removal: string) => {
    const contributors = getContributors().filter(
      (contributor) => contributor !== removal
    );
    writeContributors(contributors);
  });
