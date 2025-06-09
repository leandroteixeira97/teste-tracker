import AttendanceInformation from '@/elements/AttendanceInformation/AttendanceInformation';
import { AttendanceDTO } from '@/model/dto/AttendanceDTO';
import { UserDTO } from '@/model/dto/UserDTO';
import { JSX } from 'react';
import Styles from './AttendanceListContainer.module.scss';

const AttendancesList = (props: AttendancesListProps) => {
    const attendances: JSX.Element[] = props.attendances.map((attendance: AttendanceDTO) => (
        <AttendanceInformation id={`attendance_${attendance.id}`} key={`attendance_${attendance.id}`} attendance={attendance} users={props.users} />
    ));

    return (
        <div className={Styles.attendanceListContainer}>
            {attendances}
            <p>
                Exibindo {props.attendances.length} registro(s) do total de {props.attendances.length} registro(s)
            </p>
        </div>
    );
};

interface AttendancesListProps {
    users: UserDTO[];
    attendances: AttendanceDTO[];
}

export default AttendancesList;
