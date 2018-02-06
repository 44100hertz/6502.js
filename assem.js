"use strict";

const fs = require('fs');
const codes = require('./codes');

const inpath = 'test.asm';
const outpath = 'test.bin';

const read_file = (err, input) => {
    if (err) { throw err; }

    lex(input);

    let buf = [];
    const buf8 = Uint8Array.from(buf);
    fs.writeFile(outpath, buf8, (err) => {
        if (err) { throw err; }
    });
};

const lex = (code) => {
    let line_iter = /(.*?)(;.*\n|\n)/umg;
    let line;

    while ((line = line_iter.exec(code)) !== null) {

        // Matching Rules
        // label:  start of line, or first word ending in :
        // opcode: indented or ".word" not ending in :
        // arg:    the rest of the line :^)

        const [, label, opcode, arg] = /^(\w+|\s+\w+(?=:)|)[\s:\.]*(\w*)(.*?)$/u
              .exec(line[1])
              .map(s => s.trim());

        if (label || opcode) {
            console.log(label, '|', opcode, '|', arg);
        }
    }
};

fs.readFile(inpath, read_file);
