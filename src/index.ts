import Block from "./block";
import BlockChain from "./BlockChain";
import Transaction from "./transaction";

let genesis = new Block();
let blockChain = new BlockChain(genesis);

let transaction1 = new Transaction("Piet", "Klaas", 20);
let transaction2 = new Transaction("Piet", "Klaas", 5);

let newBlock = blockChain.getNextBlock([transaction1, transaction2])
blockChain.addBlock(newBlock)

console.log(blockChain);
