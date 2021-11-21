const {IsFile, isValidFile } = require('../src/fileValidation');
const fs = require('fs');
const path = require('path');
const ErrorCustom = require('../src/errorCustom');

describe('isValidFile', () => {

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('User passes -i argument with path that does not exist or with no read access', done => {
    let openFileCallback;
    jest.spyOn(fs, 'open').mockImplementation( (path, options, callback) =>{
      openFileCallback = callback;
   })

   isValidFile('i.txt');

   const mError = new Error('Check the file path or file name and its permissions');
   
   expect(() => openFileCallback(mError)).toThrowError(mError);
   done();
    
  });
  });

  describe('IsFile', () => {
    
    test('User passes -o argument with path to directory that does not exist or with no read access', ()=> {
      
      expect(()=> IsFile('D:\\task1\\Ciphering-CLI-Tool\\_tests_\\out')).toThrowError(ErrorCustom)
      
    });
  });

