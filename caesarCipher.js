// true - encoding ; false - decoding;
const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowerCase = 'abcdefghijklmnopqrstuvwxyz';

function caesarCipher(chunk, shift, operation){
    let values = 26;
    if (!operation){
        shift *= -1;
        values = -26;
    }
    let newChank =  chunk.toString().split('').map( item =>{
      if ( /[a-z]/i.test(item)){
        if( upperCase.includes(item) ) {
          let indexInc = upperCase.indexOf(item) + shift;
          if ( indexInc >= 0 && indexInc <= 25 ) return upperCase[indexInc % 26];
          else return upperCase[(indexInc - values) % 26];
        }
        else {
          let indexInc = lowerCase.indexOf(item) + shift;
          if ( indexInc >= 0 && indexInc <= 25 ) return lowerCase[indexInc % 26];
          else return lowerCase[(indexInc - values) % 26];
        }
      }
      else return item;
    }).join(''); 
    return newChank;
}

module.exports = { caesarCipher };  