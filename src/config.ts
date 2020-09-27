interface User {
  userId: string;
  name: string;
  publicKey: string;
  privateKey: string;
}

export interface Config
{
  users: User[]
}
