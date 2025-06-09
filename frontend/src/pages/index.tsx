import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';
import RootLayout from './layout';

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        router.push('/home');
    }, [router]);

    return <div />;
}

Home.getLayout = function getLayout(page: ReactElement) {
    return <RootLayout>{page}</RootLayout>;
};
