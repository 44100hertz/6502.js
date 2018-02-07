const codes = require('./codes');

const assem = {
    program: (lexed) => {
        const labels = {};

        const program = lexed
            .map(line => assem.program_line(line, labels));

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

        const code = code_set[line.arg_type];
        const value = assem.value(line.arg_data);

        // 1:1 lexing -> assembly works for many things
        if (code) {
            return {code, value};
        }

        if (/^a$/i.test(line.arg_data)) {
        }

        // Handle addr -> zero|abs, addrx -> zerox|absx, etc.
        if (/^addr/.test(line.arg_type)) {
            if (!value) {
                return `could not parse value: ${line.arg_data}`;
            }
            const arg_type = line.arg_type.replace(
                'addr', value < 0x100 ? 'zero' : 'abs');

            const code = code_set[arg_type];
            if (code) {
                return {code, value};
            }
        }

        return `unsupported parameter type for ${line.code}: ${line.arg_type}`;
    },

    value: (value) => {
        switch(value[0]) {
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
