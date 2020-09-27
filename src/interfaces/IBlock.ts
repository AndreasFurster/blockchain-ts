import ITransaction from "./ITransaction";

export default interface IBlock {
  index?: number;
  hash?: string;
  previousHash?: string;
  transactions?: ITransaction[];
  key?: string;
  signature?: string;
}
