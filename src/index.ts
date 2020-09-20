import Block from "./block";
import BlockChain from "./BlockChain";
import Transaction from "./transaction";

let genesis = new Block();

console.time('Mining genisis block')
let blockChain = new BlockChain(genesis);
console.timeEnd('Mining genisis block')

let transaction1 = new Transaction("Piet", "Klaas", 20);
let transaction2 = new Transaction("Piet", "Klaas", 5);

console.time('Mining block')
let newBlock = blockChain.getNextBlock([transaction1, transaction2])
console.timeEnd('Mining block')

blockChain.addBlock(newBlock)

console.log(blockChain);
