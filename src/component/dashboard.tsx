"use client"
import { useRouter } from 'next/navigation';
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

export default function Dashboard() {    
    const router = useRouter();

    const logout = () => {   
        pb.authStore.clear();   
        document.cookie = pb.authStore.exportToCookie({ httpOnly: false });
        router.push("/");
     }

    return (
        <>
            <h1>Hello , I'm /dashboard.tsx</h1>
            <button type="button" onClick={() => router.push('/dashboard/homepage')}>
                Go to Home Page
            </button>
            <button type="button" onClick={() => router.push('/dashboard/linkpage')}>
                Go to Link Page
            </button>
            <button type="button" onClick={() => logout()}>
                Log out
            </button>
        </>
    )
}