import { AttendanceDTO } from '@/model/dto/AttendanceDTO';
import { UserDTO } from '@/model/dto/UserDTO';
import Styles from './AttendanceInformation.module.scss';

const AttendanceInformation = (props: AttendanceInformationProps) => {
    const user: UserDTO | undefined = props.users.find((user: UserDTO) => user.id === props.attendance.userId);
    const userName: string = user ? user.name : props.attendance.userId;

    return (
        <div id={props.id} className={Styles.attendanceInformationContainer}>
            <div className={Styles.attendanceHeader}>
                <p>
                    <b>ID: </b>
                    {props.attendance.id}
                </p>
                <p>
                    <b>Data: </b>
                    {props.attendance.createdAt.toString()}
                </p>
                <p>
                    <b>Registrado por: </b> {userName}
                </p>
            </div>


            <div className={Styles.attendanceBody}>
                <p className={Styles.descriptionHeader}>Descrição</p>
                <p className={Styles.descriptionBody}>{props.attendance.description}</p>
            </div>
        </div>
    );
};

interface AttendanceInformationProps {
    id: string;
    attendance: AttendanceDTO;
    users: UserDTO[];
}

export default AttendanceInformation;
