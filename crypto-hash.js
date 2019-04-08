// native module
const crypto = require('crypto');

const cryptoHash = (...inputs) => {
    const hash = crypto.createHash('sha256');

    // takes string and generates relevant hash value
    // join the array as one string with a space delimeter
    hash.update(inputs.sort().join(' '));

    // way to represent hash value - Hex form in this case
    return hash.digest('hex');
};


module.exports = cryptoHash;