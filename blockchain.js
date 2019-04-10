const Block = require('./block');
const cryptoHash = require('./crypto-hash');

class Blockchain {
    constructor() {
        this.chain = [Block.genesis()];
    }

    addBlock({data}) {

        // based on data, mine a new block
        const newBlock = Block.mineBlock({
            lastBlock: this.chain[this.chain.length-1],
            data
        });

        // add the block to the blockchain
        this.chain.push(newBlock);
    }


    // Validate the authenticity of blockchain
    static isValidChain(chain) {

        // check if first block of passed chain is tampered
        if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())){
            return false;
        }


        // loop through the blockchain
        for(let i = 1; i < chain.length; i++) {

            // store all the key-values in below local variables
            const {timestamp, lastHash, hash, data} = chain[i];

            // Hash of previous block
            const actualLastHash = chain[i-1].hash;

            if(lastHash !== actualLastHash) {
                return false;
            }
            
            
            const validatedHash = cryptoHash(timestamp, lastHash, data);

            // ensure current hash equals actual SHA-256 generated hash
            if(hash != validatedHash) {
                return false;
            }
        }

        // passed all validations without fail - valid chain
        return true;
    }

}


module.exports = Blockchain;