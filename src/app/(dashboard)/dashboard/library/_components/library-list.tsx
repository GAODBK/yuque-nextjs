// src/app/(dashboard)/dashboard/library/_components/library-list.tsx
import React from 'react';
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Ellipsis, GripVertical} from "lucide-react";
import {BsJournalBookmark} from "react-icons/bs";
import Link from "next/link";
import LibraryListNewIcons from "@/app/(dashboard)/dashboard/library/_components/library-list-new-icons";
import LibraryListToggleView from "@/app/(dashboard)/dashboard/library/_components/library-list-toggle-view";
import {Library, Note} from "@prisma/client";
import {format} from "date-fns";

// todo: 根据view渲染列表或分组card
const LibraryList = ({view, libraries}: {
    view: string;
    libraries: Library[]
}) => {

    return (
        <div className={`px-4 py-3`}>
            <Tabs defaultValue="my" className="w-full">
                <div className={`flex justify-between pr-2`}>
                    <TabsList>
                        <TabsTrigger value="my">我个人的</TabsTrigger>
                        <TabsTrigger value="group">来自知识小组的</TabsTrigger>
                        <TabsTrigger value="invite">邀请协作的</TabsTrigger>
                    </TabsList>
                    <div className={`flex-1`}/>
                    <LibraryListNewIcons/>
                    <TabsList>
                        <LibraryListToggleView/>
                    </TabsList>
                </div>
                <TabsContent value="my" className={`my-6 w-full flex-wrap flex flex-row items-center gap-4`}>
                    {libraries && libraries.map(i => (
                        <div key={i.id}
                             className={`rounded-md h-44 border flex flex-col`}>
                            <Link
                                href={`/malred/${i.id}`}
                                className={`h-20 w-96 cursor-pointer group items-center 
                                            flex flex-row justify-between
                                            bg-white p-2 rounded-md`}>
                                <div className={`px-2 flex-1 flex flex-row items-center gap-x-2`}>
                                    <BsJournalBookmark className={`size-6`}/>
                                    <div className={`flex flex-col justify-center`}>
                                        <span className={``}>
                                            {i.name}
                                        </span>
                                        <span className={`text-sm text-slate-600/60`}>
                                            {i.description}
                                        </span>
                                    </div>
                                </div>
                                <div className={`rounded-md p-1 hover:border`}>
                                    <Ellipsis
                                        className={`size-6 group-hover:block hidden`}/>
                                </div>
                            </Link>
                            <ul className={`mb-4 pl-5 pr-4 space-y-2`}>
                                {/*@ts-ignore*/}
                                {i.Note && i.Note.slice(0, 3).map((n: Note) => (
                                    <li key={n.id}
                                        className={`cursor-pointer list-disc mx-4`}>
                                        <Link href={`/malred/${i.id}/${n.id}`}>
                                            <div
                                                className={`
                                            flex justify-between hover:text-slate-600 text-sm text-slate-600/60
                                            `}>
                                                {/*<span className={`mr-2 font-bold`}>·</span>*/}
                                                <span className={``}>{n.name}</span>
                                                {/*<span>{format(n.createdAt, 'yyyy-MM-dd HH:mm:ss')}</span>*/}
                                                <span>{format(n.createdAt, 'yyyy-MM-dd HH:mm')}</span>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </TabsContent>
                <TabsContent value="group">来自知识小组的</TabsContent>
                <TabsContent value="invite">邀请协作的</TabsContent>
            </Tabs>
        </div>
    );
};

export default LibraryList;