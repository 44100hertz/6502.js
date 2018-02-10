'use strict';

const codes = require('./codes');

const regex_array = (pat) =>
      (input) => {
          const list = [];
          let item;
          while ((item = pat.exec(input))) {
              list.push(item[1]);
          }
          return list;
      };

const lex = {
    multi_line: (code, lineno = 0) => lex.line_array(code)
        .map((line) => lex.line(line, ++lineno)),

    line_array: regex_array(/(.*?)(;.*\n|\n)/mg),

    line: (line, lineno) => {
        // Matching Rules:
        // label:  start of line, or first word ending in :
        // opcode: indented or ".word" not ending in :
        // arg:    the rest of the line :^)
        const [, label, lowcode, arg] = /^(\w+|\s+\w+(?=:)|)[\s:\.]*(\w*)(.*)$/
              .exec(line)
              .map((s) => s.trim());

        const codename = lowcode.toUpperCase();
        const [arg_type, arg_data] = lex.argument(codename, arg);

        return {label, codename, arg, arg_type, arg_data, lineno};
    },

    argument: (code, arg) => {
        if (codes[code]) {
            return lex.operator_argument(arg);
        } else if (code == 'org') {
            return ['addr', arg];
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
