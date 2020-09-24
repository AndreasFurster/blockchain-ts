import Block from "./block";
import BlockChain from "./BlockChain";
import Transaction from "./transaction";

// First block in the entire blockchain called the genesis block
let genesis = new Block();

// Create blockchain with the genesis block (this will mine the first block)
console.time('Mining genisis block')
let blockChain = new BlockChain(genesis);
console.timeEnd('Mining genisis block')

// Make some transactions
let transaction1 = new Transaction("Piet", "Klaas", 20);
let transaction2 = new Transaction("Piet", "Klaas", 5);

// Mine new block with the transactions
console.time('Mining block')
let newBlock = blockChain.getNextBlock([transaction1, transaction2])
console.timeEnd('Mining block')

// Add the mined block to the blockchain
blockChain.addBlock(newBlock)

console.log(blockChain);
