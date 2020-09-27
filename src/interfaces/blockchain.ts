import { IMessage } from "../models/message.model";
import IBlock from "./IBlock";
import ITransaction from "./ITransaction";

export default interface IBlockChain {
  blocks: IBlock[];
  difficulty: number;

  addBlock(block: IBlock) : void;
  getPreviousBlock() : IBlock;
  getNextBlock(message: IMessage[]) : IBlock;
  generateHash(block: IBlock) : string;
  verifySignature(hash: string, publicKey: string, signature: string) : boolean;
}
