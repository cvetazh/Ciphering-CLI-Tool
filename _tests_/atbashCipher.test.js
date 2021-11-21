const { atbashCipher } = require('../src/atbashCipher');

describe('atbashCipher', () =>{

  test('should encode string by Atbash cipher ', () => {
    //Arrange
    const str = 'abcdefghijklmnopqrstuvwxyz A Z';
    //Act
    const encodedStr = atbashCipher(str);
    //Assert
    expect(encodedStr).toBe('zyxwvutsrqponmlkjihgfedcba Z A')
    });

  test('should Russian letters, numbers and special characters does NOT encode ', () => {
    //Arrange
    const str = 'йцукенгшщзхъфывапролджэячсмитьбю 123 _-?!",.';
    //Act
    const encodedStr = atbashCipher(str);
    //Assert
    expect(encodedStr).toBe('йцукенгшщзхъфывапролджэячсмитьбю 123 _-?!",.')
    });

});



