import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import IBlock from '../interfaces/IBlock';
import { IMessage } from './message.model';

export interface IBlockChain extends mongoose.Document {
    blocks: IBlock[];
    difficulty: number;
  
    addBlock(block: IBlock) : void;
    getPreviousBlock() : IBlock;
    getNextBlock(message: IMessage[]) : IBlock;
    generateHash(block: IBlock) : string;
    verifySignature(hash: string, publicKey: string, signature: string) : boolean;
  };
  
  export const BlockChainSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    blocks: Array,
    difficulty: Number,
  }, {
      timestamps: true,
  });
  
  const BlockChainModel = mongoose.model<IBlockChain>('Blockchain', BlockChainSchema);
  export default BlockChainModel;