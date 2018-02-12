'use strict';

const codes = require('./codes');

const lex = {
    multi_line: (code, lineno = 0, defined = {}) =>
        /(?:;.*?\n|\n)/g[Symbol.split](code)
        .map((line) => lex.line(line, ++lineno, defined)),

    line: (line, lineno, defined) => {
        const definition = /(.*)=(.*)/.exec(line);
        if (definition) {
            const [, lval, rval] = definition;
            defined[lval.trim()] = rval.trim();
            return {};
        }

        // Matching Rules:
        // label:  start of line, or first word ending in :
        // opcode: indented or ".word" not ending in :
        // arg:    the rest of the line :^)
        const [, label, lowcode, arg] = /^(\w+|\s+\w+(?=:)|)[\s:\.]*(\w*)(.*)$/
              .exec(line)
              .map((s) => s.trim());

        const codename = lowcode.toUpperCase();
        let [arg_type, arg_data] = lex.argument(codename, arg, defined);

        if (typeof arg_data == 'string' && defined[arg_data] !== undefined) {
            arg_data = defined[arg_data];
        }

        return {label, codename, arg, arg_type, arg_data, lineno};
    },

    argument: (codename, arg, defined) => {
        if (codes[codename]) {
            return lex.operator_argument(arg);
        } else if (codename == 'ORG') {
            return ['addr', arg];
        } else if (codename == 'DB' || codename == 'DW') {
            return ['list', /[\s,]+/g[Symbol.split](arg)
                    .map((v) => defined[v] !== undefined ? defined[v] : v)];
        } else {
            return ['unknown', arg];
        }
    },

    operator_argument: (arg) => {
        const patterns = [
            ['indrx', /[(](.*),\s*x\s*[)]/i],
            ['indry', /[(](.*)[)]\s*,\s*y/i],
            ['indr',  /[(](.*)[)]/],
            ['addrx', /(.*)\s*,\s*x/i],
            ['addry', /(.*)\s*,\s*y/i],
            ['immed', /#(.*)/],
            ['accum', /^a$()/i],
            ['addr',  /(.+)/],
        ];

        for (const match of patterns) {
            const pat = match[1].exec(arg);
            if (pat) {
                return [match[0], pat[1]].map((s) => s.trim());
            }
        }

        return ['none', arg];
    },
};

module.exports = lex;
