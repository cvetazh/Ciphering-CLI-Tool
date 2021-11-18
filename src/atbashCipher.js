const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
const reverseUpperCase = 'ZYXWVUTSRQPONMLKJIHGFEDCBA' ;
const reverseLowerCase = 'zyxwvutsrqponmlkjihgfedcba';

function atbashCipher(chunk){
    let newChank =  chunk.toString().split('').map( item =>{
        if ( /[a-z]/i.test(item)){
            if( upperCase.includes(item) ) return reverseUpperCase[upperCase.indexOf(item)];
            else return reverseLowerCase[lowerCase.indexOf(item)];
        }
        else return item;
    }).join('');
    return newChank;
}
module.exports = { atbashCipher};