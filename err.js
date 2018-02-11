const err = {
    log: (msg, lineno) => {
        console.error(`${lineno}: ${msg}`);
    }
};

module.exports = err;
