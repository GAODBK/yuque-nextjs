// src/app/(knowledge)/[username]/[libraryId]/_components/sidebar-home-item.tsx
'use client';
import React from 'react';
import {cn} from "@/lib/utils";
import {RiHome4Line} from "react-icons/ri";
import {usePathname, useRouter} from "next/navigation";

const SidebarHomeItem = ({libraryId}: { libraryId: string }) => {
    const pathname = usePathname()
    const isCurrent = pathname === `/malred/${libraryId}`
    const router = useRouter()

    return (<div
            className={cn(
                `w-[90%] rounded-md items-center px-2 flex hover:bg-slate-300/30 h-8 gap-x-2`,
                isCurrent && `bg-slate-300/30`
            )}
            onClick={() => router.push(`/malred/${libraryId}`)}
        >
            <RiHome4Line className={`size-5`}/>
            <span className={`text-sm`}>首页</span>
        </div>
    );
};

export default SidebarHomeItem;