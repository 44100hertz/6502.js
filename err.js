const err = {
    log: (msg, lineno, file = '') => {
        console.error(`${file}(${lineno}): ${msg}`);
    }
};

module.exports = err;
