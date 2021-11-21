const { getValidConfig, getFile, isExistsOptional} = require('./consoleValidation.js');
const { transformation } = require('./transformation.js');
const input = ['-i', '--input'];
const output = ['-o', '--output'];

isExistsOptional();
transformation(getValidConfig(), getFile(input), getFile(output))