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
        let pc = 0;
        for (const line of program) {
            const label = labels[line.value];

            const [value, relative] =
                  typeof line.value === 'number' ? [line.value] :
                  line.width === 3 ? [label] :
                  line.width === 2 ? [label - pc - line.width, true] : [];

            if (line.width >= 2 && value === undefined) {
                err.log(`Unknown value or label: ${line.value}`, line.lineno);
            }
            out[line.pc] = line.code;
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

            pc += line.width;
        }

        return out;
    },

    count: (program, labels, pc = 0) => {
        for (const line of program) {
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
