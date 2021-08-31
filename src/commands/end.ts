import chalk from 'chalk';
import { promises } from 'fs';
import { pear } from '../cli';

pear
    .command('end')
    .description('End a pair programming session')
    .action(async () => {
        try {
            await promises.rm('./.pear/session', { force: true });
            console.info(chalk.yellowBright('Successfully ended pairing session.'));
        } catch (error) {
            console.error(chalk.redBright('Could not remove Pear\'s session file.'));
        }
        
    });