// src/app/(dashboard)/page.ts
'use client';
import React, {useEffect} from 'react';
import {useRouter} from "next/navigation";

const Page = () => {
    const router = useRouter()
    useEffect(() => {
        router.replace(`/dashboard`)
    }, [])

    return null
};

export default Page;