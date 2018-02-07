const fs = require('fs');
const lex = require('./lex');
const assem = require('./assem');

const inpath = 'test.asm';
const outpath = 'test.bin';

const read_file = (err, input) => {
    if (err) { throw err; }

    const lexed = lex.multi_line(input);
    const {program, labels} = assem.program(lexed);

    console.log(lexed);
    console.log(program);
    console.log(labels);

    // fs.writeFile(outpath, buf8, (err) => {
    //     if (err) { throw err; }
    // });
};

fs.readFile(inpath, read_file);
