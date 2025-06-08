import AttendanceInformation from '@/elements/AttendanceInformation/AttendanceInformation';
import { AttendanceDTO } from '@/model/dto/AttendanceDTO';
import { UserDTO } from '@/model/dto/UserDTO';
import { JSX } from 'react';

const AttendancesList = (props: AttendancesListProps) => {
    const attendances: JSX.Element[] = props.attendances.map((attendance: AttendanceDTO) => (
        <AttendanceInformation id={`attendance_${attendance.id}`} key={`attendance_${attendance.id}`} attendance={attendance} users={props.users} />
    ));

    return <div>{attendances}</div>;
};

interface AttendancesListProps {
    users: UserDTO[];
    attendances: AttendanceDTO[];
}

export default AttendancesList;
