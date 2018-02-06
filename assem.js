"use strict";

const fs = require('fs');
const codes = require('./codes');

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

const lex = {
    line: (line) => {
        // Matching Rules:
        // label:  start of line, or first word ending in :
        // opcode: indented or ".word" not ending in :
        // arg:    the rest of the line :^)
        const [, label, opcode, arg] = /^(\w+|\s+\w+(?=:)|)[\s:\.]*(\w*)(.*)$/u
              .exec(line)
              .map(s => s.trim());

        if (label || opcode) {
            console.log(label, '|', opcode, '|', arg);
            if (arg && codes[opcode.toUpperCase()]) {
                const [kind, data] = lex.op_arg(arg);
                console.log('    > arg:', kind, data);
            }
        }
    },

    multi_line: (code) => {
        let line_iter = /(.*?)(;.*\n|\n)/umg;
        let line;

        while ((line = line_iter.exec(code))) {
            lex.line(line[1]);
        }
    },

    op_arg: (arg) => {
        const clean_arg = arg.replace(/\s+/, ' ');

        const patterns = [
            ['indrx', /[(](.*), ?x[)]/u],
            ['indry', /[(](.*)[)] ?, ?y/u],
            ['ind',   /[(](.*)[)]/],
            ['addrx', /(.*) ?, ?x/u],
            ['addry', /(.*) ?, ?y/u],
            ['immed', /#(.*)/],
            ['add',   /(.*)/],
            ['none',  /^\s*$/],
        ];

        for (const match of patterns) {
            const pat = match[1].exec(arg);
            if (pat) {
                return [match[0], pat[1]];
            }
        }

        return ['undefined', arg];
    },
};

fs.readFile(inpath, read_file);
