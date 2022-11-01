import { User } from '../../../contracts/index.js';

interface UserInterface extends User {
  setPassword(password: string, salt: string): void;
  getPassword(): string;
  verifyPassword(password: string, salt: string): boolean;
}

export default UserInterface;
