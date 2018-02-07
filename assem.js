"use strict";

const fs = require('fs');
const codes = require('./codes');
const lex = require('./lex');

const inpath = 'test.asm';
const outpath = 'test.bin';

const read_file = (err, input) => {
    if (err) { throw err; }

    lex.multi_line(input);

    let buf = [];
    const buf8 = Uint8Array.from(buf);
    fs.writeFile(outpath, buf8, (err) => {
        if (err) { throw err; }
    });
};

fs.readFile(inpath, read_file);
