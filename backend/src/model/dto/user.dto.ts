import { Role } from "generated/prisma";

export interface UserDTO {
    id: string;
    name: string;
    role: Role;
    createdAt: string | Date | undefined;
}