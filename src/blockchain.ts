import Crypto from "crypto"
import Block from "./block";
import IBlock from "./interfaces/IBlock";
import IBlockChain from "./interfaces/blockchain";
import ITransaction from "./interfaces/ITransaction";
import crypto from "crypto";
import { IMessage } from "./models/message.model";

export default class BlockChain implements IBlockChain {
  public blocks: IBlock[];

  constructor(
    genesisBlock: IBlock,
    public difficulty: number = 1) {

    this.blocks = [];
    genesisBlock.hash = this.generateHash(genesisBlock)
    this.addBlock(genesisBlock);
  }

  getPreviousBlock() : IBlock {
    return this.blocks[this.blocks.length - 1]
  }

  getNextBlock(messages: IMessage[]) : IBlock {
    let block = new Block()

    messages.map((m: IMessage) => {
      block.addMessage(m)
    })

    let previousBlock = this.getPreviousBlock()
    block.previousHash = previousBlock.hash;

    block.index = this.blocks.length
    block.setHash(this.generateHash(block))
    return block
  }

  public addBlock(block: IBlock) : void {
    this.blocks = [...this.blocks, block]
  }

  public generateHash(block: IBlock) {
    // The hash is required to start with a couple of 0's. This makes the hash hard to generate.
    let requiredHashStart = Array(this.difficulty + 1).join("0");

    let hash: string;
    do {
      // Increase nonce. The nonce is part of the block's key. This way the input of the hash function is unique each time a hash is created.
      // The nonce is also stored in the block so one can validate the hash.
      block.nonce += 1;

      // Generate new hash
      hash = Crypto.createHash('sha256').update(block.key).digest('hex')

      // Validate valid hash
    } while(!hash.startsWith(requiredHashStart))

    return hash;
  }

  public verifySignature(hash: string, publicKey: string, signature: string) : boolean {
    const verifier = crypto.createVerify('RSA-SHA512');
    verifier.update(hash);
    const publicKeyBuf = Buffer.from(publicKey, 'utf-8');
    const signatureBuf = Buffer.from(signature, 'hex');
    return verifier.verify(publicKeyBuf, signatureBuf)
  }
}
