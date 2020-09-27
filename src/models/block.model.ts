import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import { IMessage } from './message.model';

export interface IBlock extends mongoose.Document {
    _id: ObjectId;
    index: number;
    hash: string;
    previousHash: string;
    nonce: number;
    messages: IMessage[];
    key: string;
    signature: string;
  };
  
  export const BlockSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    index: String,
    hash: String,
    previousHash: String,
    nonce: Number,
    messages: [{type: mongoose.Schema.Types.ObjectId, ref: 'Message'}],
    key: String,
    signature: String,
  }, {
      timestamps: true,
  });
  
  const BlockModel = mongoose.model<IBlock>('Block', BlockSchema);
  export default BlockModel;