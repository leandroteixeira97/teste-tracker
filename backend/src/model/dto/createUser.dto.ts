import { Role } from '@prisma/client';

export class CreateUserDTO {
    name: string;
    email: string;
    passwordHash: string;
    role: Role;
}
