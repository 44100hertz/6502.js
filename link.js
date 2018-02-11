'use strict';

const err = require('./err');

const link = {
    object: (program) => {
        const labels = {};
        const size = link.count(program, labels);
        return link.make_binary(program, labels, size);
    },

    make_binary: (program, labels, size) => {
        const out = new Uint8Array(size);

        for (const line of program) {
            if (line.code) {
                out[line.pc] = line.code;
                link.write_arg(line, labels, out, line.value);
            } else if (line.codename == 'DW') {
                let pc = line.pc;
                for (const in_value of line.value) {
                    const value = typeof in_value == 'number' ?
                          in_value : labels[in_value];
                    out[pc++] = value;
                    out[pc++] = value >> 8;
                }
            } else if (line.codename == 'DB') {
                let pc = line.pc;
                for (const value of line.value) {
                    out[pc++] = value;
                }
            }
        }

        return out;
    },

    write_arg: (line, labels, out, arg) => {
        const label = labels[arg];

        const [value, relative] =
              typeof arg === 'number' ? [arg] :
              line.width === 3 ? [label] :
              line.width === 2 ? [label - line.pc - line.width, true] : [];

        if (line.width >= 2 && value === undefined) {
            err.log(`Unknown value or label: ${arg}`, line.lineno);
        }
        switch (line.width) {
        case 2:
            if (relative
                ? (value < -0x80 || value > 0x7f)
                : (value < 0 || value > 0xff)) {
                err.log(`Overflow on value: ${value}`, line.lineno);
            }
            out[line.pc+1] = value;
            break;
        case 3:
            out[line.pc+1] = value;
            out[line.pc+2] = value >> 8;
            break;
        default:
            break;
        }
    },

    count: (program, labels, pc = 0) => {
        for (const line of program) {
            if (line.codename == 'ORG') {
                pc = line.value;
            }
            if (line.label) {
                labels[line.label] = pc;
            }
            line.pc = pc;
            pc += line.width;
        }
        return pc;
    },
};

module.exports = link;
