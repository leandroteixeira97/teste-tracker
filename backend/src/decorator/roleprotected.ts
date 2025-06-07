import { SetMetadata } from '@nestjs/common';

export const IS_ROLE_PROTECTED = 'isRoleProtected';
export const RoleProtected = () => SetMetadata(IS_ROLE_PROTECTED, true);