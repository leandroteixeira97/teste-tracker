import { Role } from "../Role";

export interface UserDTO {
    id: string;
    name: string;
    role: Role;
    createdAt: string | Date | undefined;
}