'use strict';

const fs    = require('fs');

const lex   = require('./lex');
const assem = require('./assem');
const link  = require('./link');

const inpath  = 'test.asm';
const outpath = 'test.bin';

const read_file = (err, input) => {
    if (err) {
        throw err;
    }

    const lexed   = lex.multi_line(input);
    const program = assem.program(lexed);
    const binary  = link.object(program);

    console.log(lexed);
    console.log(program);
    console.log(binary);

    // fs.writeFile(outpath, buf8, (err) => {
    //     if (err) { throw err; }
    // });
};

fs.readFile(inpath, read_file);
