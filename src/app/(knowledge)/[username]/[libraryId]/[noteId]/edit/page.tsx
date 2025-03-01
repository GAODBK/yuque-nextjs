// src/app/(knowledge)/[username]/[libraryId]/[noteId]/edit/page.tsx
import React from 'react';

interface Props {
    params: {
        username: string
        libraryId: string
        noteId: string
    }
}

const Page = ({params}: Props) => {
    const {username, libraryId, noteId} = params

    return (
        <div>

        </div>
    );
};

export default Page;