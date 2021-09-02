#!/usr/bin/env node

import { Command } from 'commander';

export const pear = new Command();

import './commands/init';
import './commands/start';
import './commands/end';
import './commands/matrix';

pear
    .command('add')
    .description('Remove a contributor from your Pear configuration')
    .argument('<contributor>', 'The name of the contributor you are adding')

pear
    .command('remove')
    .description('Remove a contributor from your Pear configuration')
    .argument('<contributor>', 'The name of the contributor you are removing')

pear.parse(process.argv);