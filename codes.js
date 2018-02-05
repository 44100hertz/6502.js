module.exports = {
    ADC: {
        immed: 0x69,
        zero : 0x65,
        zerox: 0x75,
        abs  : 0x6D,
        absx : 0x7D,
        absy : 0x79,
        indrx: 0x61,
        indry: 0x71,
    },
    AND: {
        immed: 0x29,
        zero : 0x25,
        zerox: 0x35,
        abs  : 0x2D,
        absx : 0x3D,
        absy : 0x39,
        indrx: 0x21,
        indry: 0x31,
    },
    ASL: {
        accum: 0x0A,
        zero : 0x06,
        zerox: 0x16,
        abs  : 0x0E,
        absx : 0x1E,
    },
    BCC: {
        rela : 0x90,
    },
    BCS: {
        rela : 0xB0,
    },
    BEQ: {
        rela : 0xF0,
    },
    BIT: {
        zero : 0x24,
        abs  : 0x2C,
    },
    BMI: {
        rela : 0x30,
    },
    BNE: {
        rela : 0xD0,
    },
    BPL: {
        rela : 0x10,
    },
    BRK: {
        none : 0x00,
    },
    BVC: {
        rela : 0x50,
    },
    BVS: {
        rela : 0x70,
    },
    CLC: {
        none : 0x18,
    },
    CLD: {
        none : 0xD8,
    },
    CLI: {
        none : 0x58,
    },
    CLV: {
        none : 0xB8,
    },
    CMP: {
        immed: 0xC9,
        zero : 0xC5,
        zerox: 0xD5,
        abs  : 0xCD,
        absx : 0xDD,
        absy : 0xD9,
        indrx: 0xC1,
        indry: 0xD1,
    },
    CPX: {
        immed: 0xE0,
        zero : 0xE4,
        abs  : 0xEC,
    },
    CPY: {
        immed: 0xC0,
        zero : 0xC4,
        abs  : 0xCC,
    },
    DEC: {
        zero : 0xC6,
        zerox: 0xD6,
        abs  : 0xCE,
        absx : 0xDE,
    },
    DEX: {
        none : 0xCA,
    },
    DEY: {
        none : 0x88,
    },
    EOR: {
        immed: 0x49,
        zero : 0x45,
        zerox: 0x55,
        abs  : 0x4D,
        absx : 0x5D,
        absy : 0x59,
        indrx: 0x41,
        indry: 0x51,
    },
    INC: {
        zero : 0xE6,
        zerox: 0xF6,
        abs  : 0xEE,
        absx : 0xFE,
    },
    INX: {
        none : 0xE8,
    },
    INY: {
        none : 0xC8,
    },
    JMP: {
        indr : 0x6C,
        abs  : 0x4C,
    },
    JSR: {
        abs  : 0x20,
    },
    LDA: {
        immed: 0xA9,
        zero : 0xA5,
        zerox: 0xB5,
        abs  : 0xAD,
        absx : 0xBD,
        absy : 0xB9,
        indrx: 0xA1,
        indry: 0xB1,
    },
    LDX: {
        zero : 0xA6,
        zeroy: 0xB6,
        abs  : 0xAE,
        absy : 0xBE,
        immed: 0xA2,
    },
    LDY: {
        immed: 0xA0,
        zero : 0xA4,
        zerox: 0xB4,
        abs  : 0xAC,
        absx : 0xBC,
    },
    LSR: {
        accum: 0x4A,
        zero : 0x46,
        zerox: 0x56,
        abs  : 0x4E,
        absx : 0x5E,
    },
    NOP: {
        none : 0xEA,
    },
    ORA: {
        immed: 0x09,
        zero : 0x05,
        zerox: 0x15,
        abs  : 0x0D,
        absx : 0x1D,
        absy : 0x19,
        indrx: 0x01,
        indry: 0x11,
    },
    PHA: {
        label: 0x48,
    },
    PHP: {
        label: 0x08,
    },
    PLA: {
        label: 0x68,
    },
    PLP: {
        label: 0x28,
    },
    ROL: {
        accum: 0x2A,
        zero : 0x26,
        zerox: 0x36,
        abs  : 0x2E,
        absx : 0x3E,
    },
    ROR: {
        accum: 0x6A,
        zero : 0x66,
        zerox: 0x76,
        abs  : 0x6E,
        absx : 0x7E,
    },
    RTI: {
        none : 0x40,
    },
    RTS: {
        none : 0x60,
    },
    SBC: {
        immed: 0xE9,
        zero : 0xE5,
        zerox: 0xF5,
        abs  : 0xED,
        absx : 0xFD,
        absy : 0xF9,
        indrx: 0xE1,
        indry: 0xF1,
    },
    SEC: {
        none : 0x38,
    },
    SED: {
        none : 0xF8,
    },
    SEI: {
        none : 0x78,
    },
    STA: {
        zero : 0x85,
        zerox: 0x95,
        abs  : 0x8D,
        absx : 0x9D,
        absy : 0x99,
        indrx: 0x81,
        indry: 0x91,
    },
    STX: {
        zero : 0x86,
        zeroy: 0x96,
        abs  : 0x8E,
    },
    STY: {
        zero : 0x84,
        zerox: 0x94,
        abs  : 0x8C,
    },
    TAX: {
        none : 0xAA,
    },
    TAY: {
        none : 0xA8,
    },
    TSX: {
        none : 0xBA,
    },
    TXA: {
        none : 0x8A,
    },
    TXS: {
        none : 0x9A,
    },
    TYA: {
        none : 0x98,
    },
};
