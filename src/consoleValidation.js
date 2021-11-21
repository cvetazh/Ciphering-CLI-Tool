'use strict';

const ErrorCustom = require('../src/errorCustom');
// const {argv} = process;
// const argvs = argv.slice(2);

function isExistsOptional(argvs){
    const existsOptional = new Set([]);
    argvs.forEach(item => {
      if (!existsOptional.has(item)) existsOptional.add(item);
      else throw new ErrorCustom(`Option ${item} already exists`);
    });
}

function isExistsConfigFlag(argv) {
  const arr = argv.split(' ');
  const configIndex = arr.findIndex( flag => flag == '-c' || flag == '--config' );
  if ( configIndex == -1 ) throw new ErrorCustom(`Missing config (-c or --config)`)
  else return arr[configIndex + 1];
}

function getValidConfig(argvs){
    const valuesCipher = new Set (['C1','C0','R1','R0','A']);
    let config = isExistsConfigFlag(argvs).trim();
    if (config === undefined || config == '') throw new ErrorCustom('Missing config');
    let arrConfig = config.split('-');
    arrConfig.forEach(item => {
      if (!valuesCipher.has(item)) throw new ErrorCustom(`Incorrect cipher ${item}`);
    })
    return arrConfig.join('-'); 
}

function getFile(argv, optional){
    let index = -1;
    let file;
    if (argv.includes(optional[0])) index = argv.indexOf(optional[0]);
    if (argv.includes(optional[1])) index =  argv.indexOf(optional[1]);
    if (index != -1 && argv[index + 1]) return file = argv[index + 1].trim();
    else return file;
}

module.exports = {getValidConfig, getFile, isExistsOptional, isExistsConfigFlag};
