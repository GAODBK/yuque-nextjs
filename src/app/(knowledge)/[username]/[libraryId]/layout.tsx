// src/app/(knowledge)/[username]/[libraryId]/layout.tsx
import React from 'react';
import Sidebar from "@/app/(knowledge)/[username]/[libraryId]/_components/sidebar";
import './style.scss'

const Layout = ({children, params}: {
    children: React.ReactNode;
    params: {
        username: string
        libraryId: string
    }
}) => {

    return (
        <div>
            <div className={`hidden md:flex h-full w-64 flex-col fixed inset-y-0 z-50`}>
                <Sidebar libraryId={params.libraryId}/>
            </div>
            <div className={`h-full ml-64`}>
                {children}
            </div>
        </div>
    );
};

export default Layout;