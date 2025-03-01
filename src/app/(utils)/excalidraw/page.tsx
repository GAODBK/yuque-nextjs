// src/app/(utils)/excalidraw/page.tsx
'use client';
import React from 'react';
import dynamic from "next/dynamic";

const Excalidraw = dynamic(
    async () => (await import("@excalidraw/excalidraw")).Excalidraw,
    {
        ssr: false,
    },
);

const Page = () => {
    return (
        <div className={`size-full`}>
            <Excalidraw/>
        </div>
    );
};

export default Page;