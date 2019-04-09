const Block = require('./block');

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

}


module.exports = Blockchain;