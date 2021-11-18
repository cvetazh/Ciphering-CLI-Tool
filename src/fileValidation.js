const fs = require('fs');
const {errorHandler} = require('./consoleValidation.js');

function IsFile(file){
  fs.stat(file, (err, stats) =>{
    if ( stats.isDirectory() ) return errorHandler(new Error('File is directory'));
  });
}

function isValidFile(file){
  fs.open(file,'r+', err =>{
    if (err) return errorHandler(new Error('Check the file path or file name and its permissions'));
    IsFile(file);
   });
  return true;
};

module.exports = {
  isValidFile,
  IsFile
};