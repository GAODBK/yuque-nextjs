// src/app/(dashboard)/dashboard/library/page.tsx
import React from 'react';
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import LibraryUse from "@/app/(dashboard)/dashboard/library/_components/library-use";
import LibraryList from "@/app/(dashboard)/dashboard/library/_components/library-list";
import {db} from "@/lib/db";

const Page = async ({searchParams}: {
    searchParams: {
        view: 'group'|'list'
    }
}) => {
    const libraries = await db.library.findMany({
        orderBy: {
            createdAt: "desc"
        },
        include: {
            Note: true
        }
    })

    return (
        <div>
            <h2 className={`p-4 font-semibold`}>知识库</h2>
            <div className={`p-4`}>
                <LibraryUse libraries={libraries.slice(0, 6)}/>
            </div>
            <LibraryList
                libraries={libraries}
                view={searchParams.view}/>
        </div>
    );
};

export default Page;