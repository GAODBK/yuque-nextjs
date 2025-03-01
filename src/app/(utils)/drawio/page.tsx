// src/app/(utils)/drawio/page.tsx
'use client';
import dynamic from 'next/dynamic';
import React from 'react';

import {DrawIoEmbed} from 'react-drawio';

const Page = () => {
    return (
        <div className={`size-screen`}>
            <DrawIoEmbed />
        </div>
    );
};

export default Page;