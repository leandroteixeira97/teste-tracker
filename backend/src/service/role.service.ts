import { Role } from '@prisma/client';

export class RoleService {
    private ADMIN_ROLES: Role[] = [Role.SELLER, Role.ADMINISTRATOR];

    public isAdminRole(role: Role): boolean {
        return this.ADMIN_ROLES.includes(role);
    }
}
