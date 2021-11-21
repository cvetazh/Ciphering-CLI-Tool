const fs = require('fs');
const ErrorCustom = require('../src/errorCustom');

function IsFile(file){
    if ( fs.statSync(file).isDirectory() ) throw new ErrorCustom('File is directory');
}

function isValidFile(file){
  fs.open(file,'r+', (err, data) =>{
    if (err) throw new ErrorCustom('Check the file path or file name and its permissions');
    IsFile(file);
   });
  return true;
};

module.exports = {
  isValidFile,
  IsFile
};