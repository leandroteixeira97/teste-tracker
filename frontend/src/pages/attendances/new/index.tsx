import CreateAttendanceForm from '@/components/CreateAttendanceForm/CreateAttendanceForm';
import Styles from './index.module.scss';
import TrackerLogo from '@/elements/TrackerLogo/TrackerLogo';

const CreateAttendance = () => {
    return (
        <div className={Styles.createAttendancePage}>
            <div className={Styles.createAttendanceContainer}>
                <TrackerLogo />
                <h2>Cadastrar atendimento</h2>
                <CreateAttendanceForm />
            </div>
        </div>
    );
};

export default CreateAttendance;
