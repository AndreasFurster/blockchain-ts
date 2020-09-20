import ITransaction from "./Transaction";

export default interface IBlock {
  index: number;
  hash: string;
  previousHash: string;
  nonce: number;
  transactions: ITransaction[];
  key: string;
}