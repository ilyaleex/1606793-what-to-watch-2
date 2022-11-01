#!/usr/bin/env node

import 'reflect-metadata';
import { CLI } from './app/cli/index.js';
import {
  VersionCommand,
  HelpCommand,
  ImportCommand,
  GenerateCommand,
} from './app/cli/commands/index.js';

const manager = new CLI();

manager.registerCommands([
  new VersionCommand(),
  new HelpCommand(),
  new ImportCommand(),
  new GenerateCommand(),
]);

manager.processCommand(process.argv);
