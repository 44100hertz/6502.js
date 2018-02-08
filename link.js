'use strict';

const link = {
    object: (program) => {
        const labels = {};
        const pc = link.count(program, labels);
        const out = new Uint8Array(pc);

        for (const line of program) {
            const value = typeof line.value == 'number' ?
                  line.value : labels[line.value];
            if (line.width >= 2 && value === undefined) {
                console.log(`Unknown value or label: ${line.value}`);
                // error: unknown value or label
            }
            out[line.pc] = line.code;
            switch (line.width) {
            case 2:
                out[line.pc+1] = value;
                break;
            case 3:
                out[line.pc+1] = value >> 8;
                out[line.pc+2] = value;
                break;
            default:
                break;
            }
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
