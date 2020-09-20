import Crypto from "crypto"
import Block from "./block";
import IBlock from "./interfaces/block";
import IBlockChain from "./interfaces/blockchain";
import ITransaction from "./interfaces/Transaction";

export default class BlockChain implements IBlockChain {
  public blocks: IBlock[];
  public difficulty: number;

  constructor(genesisBlock: IBlock) {
    this.difficulty = 5;
    this.blocks = [];
    genesisBlock.previousHash = "0000000000"
    genesisBlock.hash = this.generateHash(genesisBlock)
    this.addBlock(genesisBlock);
  }

  getPreviousBlock() : IBlock {
    return this.blocks[this.blocks.length - 1]
  }

  getNextBlock(transactions: ITransaction[]) : IBlock {
    let block = new Block()

    transactions.map((t: ITransaction) => {
      block.addTransaction(t)
    })

    let previousBlock = this.getPreviousBlock()
    block.previousHash = previousBlock.hash

    block.index = this.blocks.length
    block.hash = this.generateHash(block)

    return block
  }

  public addBlock(block: IBlock) : void {
    this.blocks = [...this.blocks, block]
  }

  public generateHash(block: IBlock) {
    let requiredHashStart = Array(this.difficulty + 1).join("0");

    let hash: string;
    console.time("Mining Block");

    do {
      hash = Crypto.createHash('sha256').update(block.key).digest('hex')
      block.nonce += 1;
    } while(!hash.startsWith(requiredHashStart))

    console.timeEnd("Mining Block");

    return hash;
  }
}
