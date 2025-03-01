// src/app/(knowledge)/[username]/[libraryId]/_components/sidebar-rename-input.tsx
'use client';
import React, {useState} from 'react';
import {Library} from "@prisma/client";
import {Input} from "@/components/ui/input";
import {updateLibrary} from "@/app/(knowledge)/[username]/[libraryId]/actions/update-library";
import {useRouter} from "next/navigation";

const HomepageRenameInput = ({library}: { library: Library }) => {
    const router = useRouter()
    const [v, setV] = useState(library.name)

    return (
        <Input
            onBlur={async () => {
                await updateLibrary({id: library.id, name: v})
                router.push(`/malred/${library.id}`)
                router.refresh()
            }}
            value={v}
            className={`font-bold text-2xl`}
            onChange={(e) => setV(e.target.value)}
        />
    );
};

export default HomepageRenameInput;