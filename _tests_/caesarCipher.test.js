const { caesarCipher } = require('../src/caesarCipher');

describe('caesarCipher', () =>{

  test('should encode string by Caesar cipher ', () => {
    //Arrange
    const str = 'abcdefghijklmnopqrstuvwxyz A Z';
    //Act
    const encodedStrCaesar = caesarCipher(str, 1, 1);
    const decodedStrCaesar = caesarCipher(str, 1, 0);
    const encodedStrROT8 = caesarCipher(str, 8, 1);
    const decodedStrROT8 = caesarCipher(str, 8, 0);
    //Assert
    expect(encodedStrCaesar).toBe('bcdefghijklmnopqrstuvwxyza B A');
    expect(decodedStrCaesar).toBe('zabcdefghijklmnopqrstuvwxy Z Y');
    expect(encodedStrROT8).toBe('ijklmnopqrstuvwxyzabcdefgh I H');
    expect(decodedStrROT8).toBe('stuvwxyzabcdefghijklmnopqr S R');

    });

  test('should Russian letters, numbers and special characters does NOT encode ', () => {
    //Arrange
    const str = 'йцукенгшщзхъфывапролджэячсмитьбю 123 _-?!",.';
    //Act
    const encodedStr = caesarCipher(str, 1, 1);
    //Assert
    expect(encodedStr).toBe('йцукенгшщзхъфывапролджэячсмитьбю 123 _-?!",.')
    });

});



