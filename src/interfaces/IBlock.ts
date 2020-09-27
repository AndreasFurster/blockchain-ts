import { IMessage } from "../models/message.model";
import ITransaction from "./ITransaction";

export default interface IBlock {
  index: number;
  hash: string;
  previousHash: string;
  nonce: number;
  messages: IMessage[];
  key: string;
  signature: string;
}
