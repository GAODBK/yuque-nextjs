// src/app/(knowledge)/[username]/[libraryId]/_components/sidebar.tsx
import {BsJournalBookmark} from "react-icons/bs";
import React from 'react';
import {db} from "@/lib/db";
import {HiEllipsisHorizontal} from "react-icons/hi2";
import {Separator} from "@/components/ui/separator";
import SidebarSearchInput from "@/app/(knowledge)/[username]/[libraryId]/_components/sidebar-search-input";
import SidebarDirList from "@/app/(knowledge)/[username]/[libraryId]/_components/sidebar-dir-list";
import {Note, Group, Library} from '@prisma/client';
import SidebarHomeItem from "@/app/(knowledge)/[username]/[libraryId]/_components/sidebar-home-item";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Image from 'next/image'

const Sidebar = async ({libraryId}: { libraryId: string }) => {
    // @ts-ignore
    const library: Library & {
        Note: Note[]
        Group: Group[]
    } = await db.library.findUnique({
        where: {id: libraryId},
        include: {
            Note: {
                where: {
                    parentNoteId: null
                }
            },
            Group: true
            // Note: {
            //     where: {
            //         parentNoteId: null,
            //         groupId: null
            //     },
            //     include: {
            //         childrenNote: true
            //     }
            // },
        }
    })

    async function getNotes(id: string): Promise<null | Note> {
        let node = await db.note.findUnique({
            where: {id},
            include: {
                childrenNote: {
                    where: {
                        parentNoteId: id,
                    },
                },
            },
        });

        if (!node) {
            // @ts-ignore
            return {};
        }

        if (node.childrenNote.length > 0) {
            let children = []
            // 遍历childrenNote
            for (let child of node.childrenNote) {
                // 获取childrenNote的child
                const childNodes = await getNotes(child.id);
                // @ts-ignore
                children.push(childNodes)
            }
            // @ts-ignore
            node.childrenNote = children
        }

        return node;
    }

    let notes: Note[] = []
    if (library?.Note && library?.Note.length > 0) {
        for (let note of library?.Note) {
            // @ts-ignore
            notes.push(await getNotes(note.id))
        }
    }

    return (
        <div className={`bg-gray-200/20 h-full border-r flex flex-col overflow-y-auto shadow-sm`}>
            {/*面包屑*/}
            <div className={`px-4 pt-4`}>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem className={``}>
                            <BreadcrumbLink href="/">
                                <Image
                                    className={`rounded-md`}
                                    alt={'logo'}
                                    src={'/logo.png'}
                                    width={18}
                                    height={18}
                                />
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator/>
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/malred/${library?.id}`}>
                                {library?.name}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            {/*header: icon - library name*/}
            <div className={`flex p-4 justify-between items-center`}>
                <div className={`flex gap-x-2 items-center`}>
                    <BsJournalBookmark className={`text-blue-500 size-5`}/>
                    <text className={`font-bold`}>{library?.name}</text>
                </div>
                <HiEllipsisHorizontal className={`cursor-pointer size-5`}/>
            </div>
            <Separator/>
            <div className={`pt-4`}>
                <SidebarSearchInput/>
            </div>
            <div className={`flex flex-col py-4 items-center gap-y-2`}>
                <SidebarHomeItem libraryId={libraryId}/>
            </div>
            <SidebarDirList
                library={library}
                libraryId={libraryId}
                // @ts-ignore
                notes={notes}
                groups={library?.Group}
            />
        </div>
    );
};

export default Sidebar;