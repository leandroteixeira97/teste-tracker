import { AuthenticationService } from '@/services/AuthenticationService';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styles from './index.module.scss';

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        async function checkIfIsTokenValid() {
            const isTokenValid = await AuthenticationService.isTokenValid();

            if (isTokenValid) {
                router.push('/home');
            } else {
                router.push('/login');
            }
        }

        checkIfIsTokenValid();
    }, [router]);

    return <div className={styles.page} />;
}
