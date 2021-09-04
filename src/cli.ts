#!/usr/bin/env node

import { Command } from 'commander';

export const pear = new Command();

import './commands/init';
import './commands/start';
import './commands/end';
import './commands/matrix';
import './commands/add';
import './commands/remove';

pear.parse(process.argv);