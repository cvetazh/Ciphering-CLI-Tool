
const { isExistsOptional, isExistsConfigFlag, getValidConfig, getFile } = require('../src/consoleValidation');

describe('isExistsOptional', () => {

  test('User passes the same cli argument twice an error is thrown', () => {
    function twiceArg() {
      isExistsOptional(['-c', '-c']);
    }
    expect(twiceArg).toThrowError(new Error('Option -c already exists'));
  });

  test('User passes the same cli argument twice an error is thrown', () => {
    function twiceArg() {
      isExistsOptional(['-o', '-o']);
    }
    expect(twiceArg).toThrowError(new Error('Option -o already exists'));
  });

  test('User passes the same cli argument twice an error is thrown', () => {
    function twiceArg() {
      isExistsOptional(['-i', '-i']);
    }
    expect(twiceArg).toThrowError(new Error('Option -i already exists'));
  });

});

describe('isExistsConfigFlag', () => {

  test('User does not pass -c or --config argument', () =>{
    function noConfig() {
      isExistsConfigFlag('node main.js -conf "A" ');
    }
      expect(noConfig).toThrowError(new Error('Missing config (-c or --config)'));
    });

    test('User passes -c or --config argument', () =>{
    //Arrange
    const argv = 'node my_ciphering_cli -c A';
    const argv2 = 'node my_ciphering_cli --config A-C1-C0';
    //Act
    const config_c = isExistsConfigFlag(argv);
    const config_config = isExistsConfigFlag(argv2);
    //Assert
    expect(config_c).toBe('A');
    expect(config_config).toBe('A-C1-C0');
    });

});

describe('getValidConfig', () => {
  
  test('User passes incorrent symbols in argument for --config', () =>{
    function incorrentCipherAtbash() {
      getValidConfig('node main.js -c A0 ');
    }
    function incorrentCipherCaesar() {
      getValidConfig('node main.js -c C9 ');
    }
      expect(incorrentCipherAtbash).toThrowError(new Error('Incorrect cipher A0'));
      expect(incorrentCipherCaesar).toThrowError(new Error('Incorrect cipher C9'));
  });

  test('User passes empty config', () =>{
    function incorrentCipher() {
      getValidConfig('node main.js -c ');
    }
      expect(incorrentCipher).toThrowError(new Error('Missing config'));
  });

  test('User passes correct sequence of symbols as argument for --config ', () =>{
    //Arrange
    const argv = 'node my_ciphering_cli -c A-C0-C1';
    const argv2 = 'node my_ciphering_cli --config R1-R0';
    //Act
    const config_c = isExistsConfigFlag(argv);
    const config_config = isExistsConfigFlag(argv2);
    //Assert
    expect(config_c).toBe('A-C0-C1');
    expect(config_config).toBe('R1-R0');
  });

});

describe('getFile', () => {

  test('User does not pass -i or --input argument', () =>{
    //Arrange
    const argv = ['node', 'my_ciphering_cli', '-c', 'A'];
    const optional = ['-i', '--input'];
    //Act
    const file = getFile(argv, optional);
    //Assert
    expect(file).toBeUndefined();
  });

  test('User does not pass -o or --output argument', () =>{
    //Arrange
    const argv = ['node', 'my_ciphering_cli', '-c', 'A'];
    const optional = ['-o', '--output'];
    //Act
    const file = getFile(argv, optional);
    //Assert
    expect(file).toBeUndefined();
  });

  test('User pass -o or --output argument', () =>{
    //Arrange
    const argv = ['node', 'my_ciphering_cli', '-c', 'A' , '-o', 'output.txt'];
    const optional = ['-o', '--output'];
    //Act
    const file = getFile(argv, optional);
    //Assert
    expect(file).toBe('output.txt');
  });

  test('User pass -i or --input argument', () =>{
    //Arrange
    const argv = ['node', 'my_ciphering_cli', '-c', 'A' , '-i', 'input.txt'];
    const optional = ['-i', '--input'];
    //Act
    const file = getFile(argv, optional);
    //Assert
    expect(file).toBe('input.txt');
  });

});
