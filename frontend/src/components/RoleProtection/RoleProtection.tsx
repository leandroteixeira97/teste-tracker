import { RequestHelper } from '@/helpers/RequestHelper';
import { UserDTO } from '@/model/dto/UserDTO';
import { Role } from '@/model/Role';
import { useEffect, useState } from 'react';

const RoleProtection = (props: RoleProtectionProps) => {
    const [user, setUser] = useState< UserDTO>();

    useEffect(() => {
        const loadUserInformation = async () => {
            const response: UserDTO = (await RequestHelper.get('/users/current')) as unknown as UserDTO;
            setUser(response);
        };

        loadUserInformation();
    }, [user]);

    if (user && props.allowableRoles.includes(user.role)) {
        return <>{props.children}</>;
    }

    return <></>;
};

interface RoleProtectionProps extends React.PropsWithChildren{
    allowableRoles: Role[];
}

export default RoleProtection;
