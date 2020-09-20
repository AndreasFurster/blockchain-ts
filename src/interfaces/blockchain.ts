import IBlock from "./block";
import ITransaction from "./Transaction";

export default interface IBlockChain {
  blocks: IBlock[];
  difficulty: number;

  addBlock(block: IBlock) : void;
  getPreviousBlock() : IBlock;
  getNextBlock(transaction: ITransaction[]) : IBlock;
  generateHash(block: IBlock) : string;
}