import { Role } from "@prisma/client";

export interface UserDTO {
    id: string;
    name: string;
    role: Role;
    createdAt: string | Date | undefined;
}