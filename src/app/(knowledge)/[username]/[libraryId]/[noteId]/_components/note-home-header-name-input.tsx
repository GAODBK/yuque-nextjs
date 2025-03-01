// src/app/(knowledge)/[username]/[libraryId]/[noteId]/_components/note-home-header-name-input.tsx
'use client';
import {Input} from '@/components/ui/input';
import React, {useState} from 'react';
import {updateNote} from "@/app/(knowledge)/[username]/[libraryId]/[noteId]/actions/update-note";
import {useRouter} from "next/navigation";

const NoteHomeHeaderNameInput = ({id, name}: {
    id: string
    name: string
}) => {
    const router = useRouter()

    const [editing, setEditing] = useState(false)
    const [value, setValue] = useState(name)

    const onBlur = async () => {
        await updateNote({id, name: value})
        setEditing(false)
        router.refresh()
    }

    return (
        <div className={`flex gap-x-2 items-center`}>
            {editing ?
                <Input
                    className={``}
                    onBlur={onBlur}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                /> :
                <span
                    className={`px-2 text-slate-500 text-sm`}
                    onClick={() => setEditing(true)}
                >{name}</span>}
        </div>
    );
};

export default NoteHomeHeaderNameInput;