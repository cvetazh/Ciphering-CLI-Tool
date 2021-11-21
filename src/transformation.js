const fs = require("fs");
const { pipeline, Transform } = require("stream");
const { isValidFile, IsFile} = require('./fileValidation.js');
const { atbashCipher } = require('./atbashCipher.js');
const { caesarCipher } = require('./caesarCipher.js');

function transformation(config, inputFile, outputFile){

    let readStream;

    if(inputFile && isValidFile(inputFile)) readStream = fs.createReadStream(inputFile, 'utf8');
    else readStream = process.stdin;

    let writeStream;
    
    if(outputFile && isValidFile(outputFile)) writeStream = fs.createWriteStream(outputFile, {flags: 'a', flags:'r+'});
   else writeStream = process.stdout;

    class AtbashCipherTransform extends Transform{
        _transform(chunk, encoding, callback){
            callback(null, atbashCipher(chunk));
        }
    }
    class CaesarCipherTransform extends Transform{
        constructor(operation){
            super();
            this.operation = operation;
        }
        _transform(chunk, encoding, callback){
            callback(null, caesarCipher(chunk, 1, this.operation));
        }
    }
    class ROT8Transform extends Transform{
        constructor(operation){
            super();
            this.operation = operation;
        }
        _transform(chunk, encoding, callback){
            callback(null, caesarCipher(chunk, 8, this.operation));
        }
    }

    const transformStreams =[];
    config.split('-').forEach(item => {
        if (item =='C1') transformStreams.push(new CaesarCipherTransform(1));
        if (item =='C0') transformStreams.push(new CaesarCipherTransform(0));
        if (item =='A') transformStreams.push(new AtbashCipherTransform());
        if (item =='R1') transformStreams.push(new ROT8Transform(1));
        if (item =='R0') transformStreams.push(new ROT8Transform(0));
    })

    pipeline (
      readStream,
      ...transformStreams,
       writeStream,
      (err) =>{      
        if (err){
          process.stderr.write(err.message + '\n');
          process.exit(1);
    }}
    );
}

module.exports = {transformation};