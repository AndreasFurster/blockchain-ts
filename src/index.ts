import Block from "./block";
import BlockChain from "./BlockChain";
import Transaction from "./transaction";
import {Config} from "./config";
let config: Config = require('../config.json');



import crypto from "crypto"

let payload = "Test!"

const signer = crypto.createSign('RSA-SHA512');
signer.update(payload);
const signature = signer.sign(config.privateKey, 'hex');

console.log(signature);

const verifier = crypto.createVerify('RSA-SHA512');
verifier.update(payload);
const publicKeyBuf = Buffer.from(config.publicKey, 'utf-8');
const signatureBuf = Buffer.from(signature, 'hex');
const result       = verifier.verify(publicKeyBuf, signatureBuf);

console.log(result)





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

console.time('Verifying block')
let signatureVerified = blockChain.verifySignature(newBlock.hash, config.publicKey, newBlock.signature);
console.timeEnd('Verifying block')
// Add the mined block to the blockchain
if (!signatureVerified) {
    console.log('signature validation failed')
} else {
    console.log('signature validation success')
    blockChain.addBlock(newBlock)
}
console.log(blockChain);

