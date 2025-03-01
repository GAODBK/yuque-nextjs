// src/app/(dashboard)/dashboard/page.tsx
import React from 'react';
import {usePathnameStore} from "@/store/use-pathname-store";
import StartCards from '@/app/(dashboard)/_components/start-cards';
import NotesList from '@/app/(dashboard)/_components/notes-list';

const Page = () => {

    return (
        <div>
            <h2 className={`p-4 font-semibold`}>开始</h2>
            <StartCards/>
            <h2 className={`p-4 font-semibold`}>文档</h2>
            <NotesList/>
        </div>
    );
};

export default Page;