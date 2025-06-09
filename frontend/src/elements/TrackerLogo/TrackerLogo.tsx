import Image from 'next/image';
import Logo from '../../../public/tracker-logo.png';
import Styles from './TrackerLogo.module.scss';

const TrackerLogo = () => {
    return (
        <div className={Styles.logoContainer}>
            <Image src={Logo} alt="CRM Tracker" className={Styles.trackerLogo} />
        </div>
    );
};

export default TrackerLogo;
