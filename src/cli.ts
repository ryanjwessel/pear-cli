#!/usr/bin/env node

import commander from "commander";
import { init } from "./commands/init.js";
import { start } from "./commands/start.js";
import { end } from "./commands/end.js";
import { matrix } from "./commands/matrix.js";
import { add } from "./commands/add.js";
import { remove } from "./commands/remove.js";

const pear = new commander.Command();

pear
  .command("init")
  .description("Initialize Pear in your project")
  .action(init);

pear
  .command("start")
  .description("Start a pair programming session")
  .action(start);

pear.command("end").description("End a pair programming session").action(end);

pear
  .command("matrix")
  .description(
    "Generate a pairing matrix based on your project's commit history"
  )
  .option(
    "-a, --after [date]",
    "Show pairing history after a specific date",
    "3 months ago"
  )
  .action(matrix);
  
pear
  .command("add")
  .description("Add a contributor from your Pear configuration")
  .argument("<contributor>", "The name of the contributor you are adding")
  .action(add);

pear
  .command("remove")
  .description("Remove a contributor from your Pear configuration")
  .argument("<contributor>", "The name of the contributor you are removing")
  .action(remove);

pear.parse(process.argv);
