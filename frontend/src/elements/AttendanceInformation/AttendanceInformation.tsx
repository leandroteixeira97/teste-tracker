import { AttendanceDTO } from '@/model/dto/AttendanceDTO';
import { UserDTO } from '@/model/dto/UserDTO';

const AttendanceInformation = (props: AttendanceInformationProps) => {
    const user: UserDTO | undefined = props.users.find((user: UserDTO) => user.id === props.attendance.userId);
    const userName: string = user ? user.name : props.attendance.userId;

    return (
        <div id={props.id}>
            <p>Id: {props.attendance.id}</p>
            <p>Data: {props.attendance.createdAt.toString()}</p>
            <p>Registrado por: {userName}</p>
            <p>Descrição: {props.attendance.description}</p>
        </div>
    );
};

interface AttendanceInformationProps {
    id: string;
    attendance: AttendanceDTO;
    users: UserDTO[];
}

export default AttendanceInformation;
