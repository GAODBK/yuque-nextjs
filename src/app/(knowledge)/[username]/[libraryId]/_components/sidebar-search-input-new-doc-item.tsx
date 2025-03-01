// src/app/(knowledge)/[username]/[libraryId]/_components/sidebar-search-input-new-doc-item.tsx
'use client';
import React from 'react';
import {GrDocumentText} from "react-icons/gr";
import {DropdownMenuItem} from "@/components/ui/dropdown-menu";
import {useRouter} from "next/navigation";
import {createNote} from "@/app/(knowledge)/[username]/[libraryId]/actions/create-note";

const SidebarSearchInputNewDocItem = ({libraryId}: { libraryId: string }) => {
    const router = useRouter()

    return (
        <>
            <DropdownMenuItem
                className={`cursor-pointer`}
                onClick={async () => {
                    const note = await createNote({
                        libraryId
                    })
                    router.push(`/malred/${libraryId}/${note.id}`)
                    router.refresh()
                }}
            >
                <GrDocumentText/>
                文档
            </DropdownMenuItem>
        </>
    );
};

export default SidebarSearchInputNewDocItem;