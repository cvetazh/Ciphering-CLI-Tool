const { getValidConfig, getFile, isExistsOptional} = require('./consoleValidation.js');
const { argv, exit } = process;
const { transformation } = require('./transformation.js');
const input = ['-i', '--input'];
const output = ['-o', '--output'];
const argvs = argv.slice(2);

try{
  isExistsOptional(argvs);
  transformation(getValidConfig(argvs), getFile(argvs, input), getFile(argvs, output))
}
catch (error) {
  console.error(error.message);
  exit(1);
}

