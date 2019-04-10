const Blockchain = require('./blockchain');
const Block = require('./block');

describe ('Blockchain', () => {
     let blockchain;

     beforeEach(() => {
        blockchain = new Blockchain();
     });

     it('contains a `chain` Array instance', () => {
         expect(blockchain.chain instanceof Array).toBe(true);
     });

     it('starts with the genesis block', () => {
         expect(blockchain.chain[0]).toEqual(Block.genesis());
     });

     it('adds a new block to the chain', () => {
         const newData = 'foo bar';
         blockchain.addBlock({data: newData});

         expect(blockchain.chain[blockchain.chain.length-1].data).toEqual(newData); 
     });
     
     
     describe('isValidChain()', () => {

        // Validate genesis block
        describe('When the chain does not start with a genesis block', () => {
            
            it('returns false', () => {
                blockchain.chain[0] = {data: 'fake-genesis'};
                expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
            });

            
        });

        describe('When the chain starts with genesis block and has multiple blocks', () => {

            // Add sample data before each describe block
            beforeEach(() => {
                blockchain.addBlock({data: 'Bears'});
                blockchain.addBlock({data: 'Beets'});
                blockchain.addBlock({data: 'Battlestar Galactica'});
            });

            // Tampering with lasHash of a block
            describe('and a lastHash reference has changed', () => {
                it('returns false', () => {      
                    blockchain.chain[2].lastHash = 'broken-lastHash';

                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
                });
            });

            // Tampering with data
            describe('And the chain contains a block with an invalid field', () => {
                it('returns false', () => {                    
                    blockchain.chain[2].data = 'Tampered data';

                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false); 
                });
            });

            // No tampering
            describe('And the chain does not contain any invalid blocks', () => {
                it('returns true', () => {
                   expect(Blockchain.isValidChain(blockchain.chain)).toBe(true); 
                });
            });
        });
     });
});