import Crypto from "crypto"
import Block from "./block";
import IBlock from "./interfaces/IBlock";
import IBlockChain from "./interfaces/blockchain";
import ITransaction from "./interfaces/ITransaction";
import crypto from "crypto";
// import { TransactionSchema } from "./models/transaction.model";
// import BlockChainModel from "./models/blockchain.model";
import { BlockModel, ConvertFromModel } from "./models/block.model";

export default class BlockChain implements IBlockChain {

  public lastBlock?: IBlock;

  constructor() {

  }

  static async load() : Promise<BlockChain> {
    // Get amount of existing blocks from database
    let existingBlockCount = await BlockModel.countDocuments({})

    // If no blocks in db; Create a new blockchain with genesis block 
    if(existingBlockCount === 0) {
      console.log('No blocks found. Creating new blockchain with genesis block...');
      
      let blockchain = new BlockChain();
      
      let genesis = new Block();
      genesis.index = 0
      genesis.hash = blockchain.generateHash(genesis)
      
      blockchain.addBlock(genesis)
      return blockchain;
    }

    // If some blocks are found; initialize blockchain and load last blocks in memory
    console.log(`${existingBlockCount} blocks found. Loading last block into blockchain...`);
    
    let blockchain = new BlockChain()
    
    let lastBlockDocument = await BlockModel.findOne().sort({ createdAt: 1})
    if(lastBlockDocument === null) throw new Error('Could not get first document from database');
    
    blockchain.lastBlock = ConvertFromModel(lastBlockDocument)

    return blockchain
  }

  async getBlocks() : Promise<IBlock[]> {
    let blockDocs = await BlockModel.find()
    return blockDocs.map(ConvertFromModel)
  }

  getPreviousBlock() : IBlock {
    if(this.lastBlock === undefined) {
      throw new Error("Last block not set.");
    }

    return this.lastBlock
  }

  getNextBlock(transactions: ITransaction[]) : IBlock {
    let block = new Block()

    transactions.map((m: ITransaction) => {
      block.addTransaction(m)
    })

    let previousBlock = this.getPreviousBlock()
    block.previousHash = previousBlock.hash;
    if(previousBlock.index === undefined) throw new Error('Index of last block is undefined.')
    block.index = previousBlock.index + 1
    block.setHash(this.generateHash(block))
    return block
  }

  public async addBlock(block: IBlock) : Promise<IBlock> {
    let blockDoc = await BlockModel.create(block)
    let insertedBlock = ConvertFromModel(blockDoc)
    this.lastBlock = insertedBlock
    return insertedBlock
  }

  public generateHash(block: IBlock) {
    if(!block.key) throw new Error("Key of block is undefined.");
    
    return Crypto.createHash('sha256').update(block.key).digest('hex')
  }

  public verifySignature(hash: string, publicKey: string, signature: string) : boolean {
    const verifier = crypto.createVerify('RSA-SHA512');
    verifier.update(hash);
    const publicKeyBuf = Buffer.from(publicKey, 'utf-8');
    const signatureBuf = Buffer.from(signature, 'hex');
    return verifier.verify(publicKeyBuf, signatureBuf)
  }
}
