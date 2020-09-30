import ITransaction from "./interfaces/ITransaction";

export default class Transaction implements ITransaction {
  constructor(
    public userId: string,
    public message: string,
  ) {

  }
}
