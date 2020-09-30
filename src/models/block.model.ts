import { getModelForClass, prop, Ref } from '@typegoose/typegoose';
import IBlock from '../interfaces/IBlock';
import ITransaction from '../interfaces/ITransaction';

class Block {
  @prop()
  public index?: number;

  @prop()
  public hash?: string;

  @prop()
  public previousHash?: string;

  @prop()
  public nonce?: number;

  @prop()
  public transactions?: ITransaction[];

  @prop()
  public key?: string;

  @prop()
  public signature?: string;

};

export const BlockModel = getModelForClass(Block, { schemaOptions: { timestamps: true }});

export const ConvertFromModel = (doc: any ) : IBlock => {
  let block = new Block
  block.index = doc.index
  block.hash = doc.hash
  block.previousHash = doc.previousHash
  block.transactions = doc.transactions
  block.signature = doc.signature
  return block
}
