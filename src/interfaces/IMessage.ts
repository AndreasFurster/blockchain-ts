export default interface IMessage {
  userId: string;
  message: string;
  index: number;
  hash: string;
  previousHash: string;
  signature: string;
}
