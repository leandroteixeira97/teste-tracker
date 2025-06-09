import { Role } from '../Role';

export interface CreateUserDTO {
    name: string;
    email: string;
    passwordHash: string;
    role: Role;
}
