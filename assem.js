'use strict';

const codes = require('./codes');

const widths = {
    none:  1,
    accum: 1,

    immed: 2,
    zero:  2,
    zerox: 2,
    zeroy: 2,
    rela:  2,

    abs:   3,
    absx:  3,
    absy:  3,
    indrx: 3,
    indry: 3,
    indr:  3,
};

const assem = {
    program: (lexed) => {
        const labels = {};

        const program = lexed
            .map((line) => assem.program_line(line, labels));

        return {program, labels};
    },

    program_line: (line, labels) => {
        if (line.label) {
            labels[line.label] = line.lineno;
        }

        if (!line.code) {
            return null;
        }
        const code_set = codes[line.code.toUpperCase()];

        if (!code_set) {
            return `unknown opcode or directive: ${line.code}`;
        }

        const arg_type = code_set.rela ? 'rela' : line.arg_type;
        const code = code_set[arg_type];
        const value = assem.value(line.arg_data);

        // 1:1 lexing -> assembly works for many things
        if (code) {
            return {code, value, width: widths[arg_type]};
        }

        // Handle addr -> zero|abs, addrx -> zerox|absx, etc.
        if (/^addr/.test(arg_type)) {
            if (!value) {
                return `could not parse value: ${line.arg_data}`;
            }
            const alt_arg_type = arg_type.replace(
                'addr', value < 0x100 ? 'zero' : 'abs');

            const code = code_set[alt_arg_type];
            if (code) {
                return {code, value, width: widths[alt_arg_type]};
            }
        }

        return `unsupported parameter type for ${line.code}: ${arg_type}`;
    },

    value: (value) => {
        switch (value[0]) {
        case '$':
            return parseInt(value.substr(1), 16);
        case '%':
            return parseInt(value.substr(1), 2);
        default:
            const num = parseInt(value);
            return num ? num : value;
        }
    },
};

module.exports = assem;
