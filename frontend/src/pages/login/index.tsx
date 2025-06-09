import { useEffect, useRef, useState } from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import Styles from './index.module.scss';

const Login = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [mounted, setMounted] = useState<boolean>();

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className={Styles.login}>
            {mounted ? (
                <video autoPlay={mounted} muted={mounted} loop={mounted} className={Styles.backgroundVideo} ref={videoRef}>
                    <source src={'/background-video.mp4'} type="video/mp4" />
                </video>
            ) : (
                <></>
            )}

            <LoginForm />
        </div>
    );
};

export default Login;
