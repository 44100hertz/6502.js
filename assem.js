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
        const code_set = codes[line.code.toUpperCase()];

        if (!code_set) {
            // unknown opcode
            return null;
        }

        const code = code_set[line.arg_type];
        const value = assem.value(line.arg_data);

        // 1:1 lexing -> assembly works for many things
        if (code) {
            return [code, value];
        }

        // Handle addr -> zero|abs, addrx -> zerox|absx, etc.
        if (/^addr/.test(line.arg_type)) {
            if (!value) {
                // error; expected value
                return null;
            }

            const arg_type = line.arg_type.replace(
                'addr', value < 0x100 ? 'zero' : 'abs');

            const code = code_set[arg_type];
            if (!code) {
                // error: unsupported parameter type
                return null;
            }
            return [code, value];
        }

        // wrong parameter type
        return null;
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
