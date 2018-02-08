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
    program: (lexed) => lexed
        .map((line) => assem.program_line(line)),

    program_line: (line) => {
        const decoded = assem.decode_line(line);
        decoded.label = line.label;
        return decoded;
    },

    decode_line: (line) => {
        if (!line.code) {
            return {};
        }
        const code_set = codes[line.code.toUpperCase()];

        if (!code_set) {
            return {err: `unknown opcode or directive: ${line.code}`};
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
                return {err: `could not parse value: ${line.arg_data}`};
            }
            const zero_type = arg_type.replace('addr', 'zero');
            const abs_type = arg_type.replace('addr', 'abs');

            const alt_arg_type = (value && value < 0x100 && code_set[zero_type]) ?
                  zero_type : abs_type;

            const code = code_set[alt_arg_type];

            if (code) {
                return {code, value, width: widths[alt_arg_type]};
            }
        }

        return {err: `unsupported parameter type for ${line.code}: ${arg_type}`};
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
