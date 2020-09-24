import ITransaction from "./ITransaction";

export default interface IBlock {
  index: number;
  hash: string;
  previousHash: string;
  nonce: number;
  transactions: ITransaction[];
  key: string;
  signature: string;
}
