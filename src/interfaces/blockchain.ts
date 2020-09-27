import IBlock from "./IBlock"
import ITransaction from "./ITransaction"

export default interface IBlockChain {
  lastBlock?: IBlock

  addBlock(block: IBlock) : Promise<IBlock>
  getBlocks() : Promise<IBlock[]>
  getPreviousBlock() : IBlock
  getNextBlock(transaction: ITransaction[]) : IBlock
  generateHash(block: IBlock) : string
  verifySignature(hash: string, publicKey: string, signature: string) : boolean
}
