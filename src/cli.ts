#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import fs from 'fs';

const program = new Command();

program
    .command('init')
    .description('Initialize Pear in your project')
    .action(() => {
        console.info(chalk.yellow('🍐 Thanks for adding Pear to your project!'));
        if (!fs.existsSync('./.pear')) {
            console.info(chalk.yellow('.pear directory not found, creating it now.'));
            fs.mkdirSync('./.pear');
        }
        if (!fs.existsSync('./.pear/contributors.json')) {
            console.info(chalk.yellow('contributors.json not found, creating it now.'));
            fs.writeFileSync('./.pear/contributors.json', '{}');
        }
    })

program
    .command('start')
    .description('Start a pair programming session')

program
    .command('end')
    .description('End a pair programming session')

program
    .command('add')
    .description('Remove a contributor from your Pear configuration')
    .argument('<contributor>', 'The name of the contributor you are adding')

program
    .command('remove')
    .description('Remove a contributor from your Pear configuration')
    .argument('<contributor>', 'The name of the contributor you are removing')

program
    .command('matrix')
    .description('Generate a pairing matrix based on your project\'s commit history')

program.parse(process.argv);