import Block from './block';
import BlockChain from './BlockChain';
import Transaction from './transaction';
import IBlock from './interfaces/block';
import IBlockChain from './interfaces/blockchain';
import ITransaction from './interfaces/Transaction';

describe('blockchain', () => {
  const difficulty = 2;
  let blockchain: IBlockChain, genesis: IBlock, transaction: ITransaction;

  beforeEach(() => {
    genesis = new Block()
    blockchain = new BlockChain(genesis)
    blockchain.difficulty = difficulty
    transaction = new Transaction('Piet', 'Klaas', 20);
  })

  it('checks previous block\'s hash to be equal to current block previous hash', () =>{
    let newBlock = blockchain.getNextBlock([transaction])
    expect(newBlock.previousHash).toEqual(genesis.hash)
  })

  it('adds blocks to the blockchain', () => {
    var originalLength = blockchain.blocks.length
    let newBlock = blockchain.getNextBlock([transaction])
    blockchain.addBlock(newBlock)

    expect(blockchain.blocks.length).toEqual(originalLength + 1)
  })

  it('generates a valid hash', () => {
    let newBlock = blockchain.getNextBlock([transaction])
    let newBlockHashStart = newBlock.hash.substring(0, difficulty)
    let requiredHashStart = Array(difficulty + 1).join('0')

    expect(newBlockHashStart).toEqual(requiredHashStart)
  })
})