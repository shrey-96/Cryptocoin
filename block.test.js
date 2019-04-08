// Note: use of {} when something is exported as an object instead of class
// defining a block class - require and then point to file where the file is located
const Block = require('./block');
const { GENESIS_DATA } = require('./config');

describe('Block', () => {
    
    // dummy data
  const timestamp = 'a-date';
  const lastHash = 'foo-hash';
  const hash = 'bar-hash';
  const data = ['blockchain', 'data'];

  // in the block; since only keys are declared (no values), it'll take the value from local variable with same name
  const block = new Block({timestamp, lastHash, hash, data});

  //first test
  // ensure the block has all the properties/parameters mentioned above
  // BEST PRACTICE: Not to have multiple expect statements in on 'it' function - better to have one in one
  it('has a timestmap, lastHash, hash, and data property', () => {

      // assert that timestamp attribute in the Block object has the value of local 'timestamp' declared above - confirming the constructor works 
      expect(block.timestamp).toEqual(timestamp);    
      expect(block.lastHash).toEqual(lastHash);    
      expect(block.hash).toEqual(hash);    
      expect(block.data).toEqual(data);    
  });

  // Test for genesis functionality
  describe('genesis()', () => {

      // Note: Calling genesis from Block class itself, not the instance of it - static function
      const genesisBlock = Block.genesis();

      // Test 1 - checking instance
      it('returns a Block instance', () => {
          expect(genesisBlock instanceof Block).toBe(true);
      });

      // Test 2 - checking data and making sure they're equal
      // Note: JS implements classes as the objects; even if not declared as one (static)
      it('returns the genesis data', () => {
          expect(genesisBlock).toEqual(GENESIS_DATA);
      });
  });


  // Mining Test
  describe('mineBlock()', () => {
      const lastBlock = Block.genesis();
      const data = 'mined data';
      const minedBlock = Block.mineBlock({lastBlock, data});  

    // Test 1 - check instance
    it('returns a Block instance', () => {
        expect(minedBlock instanceof Block).toBe(true);
    });

    // Test 2 - verify the lastHash of current block equals to hash of previous block
    it('sets the `lasthash` to be the `hash` of the lastBlock', () => {
        expect(minedBlock.lastHash).toEqual(lastBlock.hash);
    });

    it('sets the `data`', () => {
        expect(minedBlock.data).toEqual(data);
    });

    it('sets a `timestamp`', () => {
        expect(minedBlock.timestamp).not.toEqual(undefined);
    });
  });
});