#!/usr/bin/env node
import commander from 'commander';
import genDiff from '../index';

const program = new commander.Command();

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format', 'default')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig, { format }) => (
    console.log(genDiff(firstConfig, secondConfig, format))
  ))
  .parse(process.argv);

if (!program.args.length) {
  program.help();
}
