const { atbashCipher } = require('../src/atbashCipher');

describe('atbashCipher', () =>{
  test('should encode string by Atbash cipher ', () => {
    //Arrange
    const str = 'abcdefghijklmnopqrstuvwxyzAZ';
    //Act
    const encodedStr = atbashCipher(str);
    //Assert
    expect(encodedStr).toBe('zyxwvutsrqponmlkjihgfedcbaZA')
    });
});


