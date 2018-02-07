const codes = require('./codes');

const lex = {
    multi_line: (code) => {
        return lex.line_array(code)
            .map(line => lex.line(line));
    },

    line_array: (code) => {
        const line_iter = /(.*?)(;.*\n|\n)/mg;
        const lines = [];
        let line;
        while ((line = line_iter.exec(code))) {
            lines.push(line[1]);
        }
        return lines;
    },

    line: (line) => {
        // Matching Rules:
        // label:  start of line, or first word ending in :
        // opcode: indented or ".word" not ending in :
        // arg:    the rest of the line :^)
        const [, label, opcode, arg] = /^(\w+|\s+\w+(?=:)|)[\s:\.]*(\w*)(.*)$/
              .exec(line)
              .map(s => s.trim());

        const [kind, data] = arg && codes[opcode.toUpperCase()] ?
              lex.op_arg(arg) : [null, null];

        return {label, opcode, arg, kind, data};
    },

    op_arg: (arg) => {
        const clean_arg = arg.replace(/\s+/, ' ');

        const patterns = [
            ['indrx', /[(](.*), ?x[)]/i],
            ['indry', /[(](.*)[)] ?, ?y/i],
            ['ind',   /[(](.*)[)]/],
            ['addrx', /(.*) ?, ?x/i],
            ['addry', /(.*) ?, ?y/i],
            ['immed', /#(.*)/],
            ['add',   /(.+)/],
        ];

        for (const match of patterns) {
            const pat = match[1].exec(arg);
            if (pat) {
                return [match[0], pat[1]];
            }
        }

        return ['none', arg];
    },
};

module.exports = lex;
