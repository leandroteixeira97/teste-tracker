import { Role } from 'generated/prisma';

export class CreateUserDTO {
  name: string;
  email: string;
  passwordHash: string;
  role: Role;
}
