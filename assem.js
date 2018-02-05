"use strict";

const fs = require('fs');
const codes = require('./codes');

const inpath = 'test.asm';
const outpath = 'test.bin';

fs.readFile(inpath, (err, input) => {
    if (err) { throw err; }

    // Lex

    // Write
    let out = [];
    out.push(codes.LDA.immed);

    const buf8 = Uint8Array.from(out);
    fs.writeFile(outpath, buf8, (err) => {
        if (err) { throw err; }
    });
});
