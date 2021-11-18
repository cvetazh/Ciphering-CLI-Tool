'use strict';
const {argv, stderr, exit} = process;

const valuesCipher = new Set (['C1','C0','R1','R0','A']);
const existsOptional = new Set([]);
const config = ['-c', '--config'];
const argvs = argv.slice(2);

function isExistsOptional(){
    argvs.forEach(item => {
      if (!existsOptional.has(item)) existsOptional.add(item);
      else return errorHandler(new Error(`Option ${item} already exists`));
    });
}

function errorHandler(error){
    stderr.write(error.message);
    exit(1);
}

function isConfigFlag() {
    if (argv.includes(config[0])) return argvs.indexOf(config[0]);
    if (argv.includes(config[1])) return argvs.indexOf(config[1]);
    if (argvs.indexOf(config[0]) || argvs.indexOf(config[1])) return errorHandler(new Error('Enter the correct flag (-c or --config)'));
}

function getValidConfig(){
    let config = argvs[isConfigFlag()+1].trim();
    if (config === undefined || config == '') return errorHandler(new Error('Missing config'));
    let arrConfig = config.split('-');
    let newConfig = [];
    arrConfig.forEach(item => {
        if(item.match(/A{2,}/)){
            item.split('').forEach(symbol => newConfig.push(symbol));
        }
        else newConfig.push(item);
    })
    newConfig.forEach(item=>{
        if (!valuesCipher.has(item)) return errorHandler(new Error(`Incorrect cipher ${item}`))
    })
    return newConfig.join('-'); 
}

function getFile(optional){
    let index = -1;
    let file;
    if (argv.includes(optional[0])) index = argvs.indexOf(optional[0]);
    if (argv.includes(optional[1])) index =  argvs.indexOf(optional[1]);
    if (index != -1 && argvs[index + 1]) return file = argvs[index + 1].trim();
    else return file;
}

module.exports = {errorHandler, getValidConfig, getFile, isExistsOptional};
