"use client"
import PocketBase from 'pocketbase';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SignIn from '@/component/signin';

const pb = new PocketBase('http://127.0.0.1:8090');

export default function signUp() {
    const router = useRouter();
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        pb.authStore.loadFromCookie(document.cookie);
        setIsValid(pb.authStore.isValid);
     });

    return (
        (isValid) ? router.push('/dashboard') : <SignIn/>     
    )
}