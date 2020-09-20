import IBlock from "./interfaces/block";
import ITransaction from "./interfaces/Transaction";


export default class Block implements IBlock {
  constructor(
    public index: number = 0,
    public hash: string = '',
    public previousHash: string = '',
    public nonce: number = 0,
    public transactions: ITransaction[] = []
  ) {
    
  }

  get key() : string {
    return JSON.stringify(this.transactions) + this.index + this.previousHash + this.nonce;
  }

  public addTransaction(transaction: ITransaction) : void {
    this.transactions = [...this.transactions, transaction]
  }
}