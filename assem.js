"use strict";

const fs = require('fs');
const lex = require('./lex');
const codes = require('./codes');

const inpath = 'test.asm';
const outpath = 'test.bin';

const read_file = (err, input) => {
    if (err) { throw err; }

    const lexed = lex.multi_line(input);
    const bin = assem.program(lexed);

    bin.forEach(v => console.log(v));

    // fs.writeFile(outpath, buf8, (err) => {
    //     if (err) { throw err; }
    // });
};

const assem = {
    program: (lexed) => {
        return lexed
            .map(line => assem.line(line));
    },

    line: (line) => {
        const code = codes[line.code.toUpperCase()];
        if (code) {
            const value = assem.value(line.arg_data);
            return [code[line.arg_type], value];
        } else {
            return null;
        }
    },

    value: (value) => {
        switch(value[0]) {
        case '$':
            return parseInt(value.substr(1), 16);
        case '%':
            return parseInt(value.substr(1), 2);
        default:
            const num = parseInt(value);
            return num ? num : 'unimplemeted; label';
        }
    },
};

fs.readFile(inpath, read_file);
