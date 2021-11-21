const { transformation } = require('../src/transformation');

describe('transformation', () =>{
  test('should encode string ', () => {
    function doneCipher() {
      transformation('C1-C1-R0-A', undefined, undefined);
    }
    expect(doneCipher).not.toThrow();
  })

});