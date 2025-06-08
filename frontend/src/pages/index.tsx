import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styles from './index.module.scss';

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        router.push('/home');
    }, [router]);

    return <div className={styles.page} />;
}
