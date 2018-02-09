'use strict';

const link = {
    object: (program) => {
        const labels = {};
        const size = link.count(program, labels);
        const out = new Uint8Array(size);

        let pc = 0;
        for (const line of program) {
            const num = typeof line.value === 'number' && line.value;
            const label = labels[line.value];

            const [value, relative] =
                  num !== undefined ? [line.value] :
                  line.width === 3  ? [label] :
                  line.width === 2  ? [label - pc - line.width, true] : [];

            if (line.width >= 2 && value === undefined) {
                console.log(`Unknown value or label: ${line.value}`);
            }
            out[line.pc] = line.code;
            switch (line.width) {
            case 2:
                if (relative
                    ? (value < -0x80 || value > 0x7f)
                    : (value < 0 || value > 0xff)) {
                    console.log(`Overflow on value: ${value}`);
                }
                out[line.pc+1] = value;
                break;
            case 3:
                out[line.pc+1] = value >> 8;
                out[line.pc+2] = value;
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
