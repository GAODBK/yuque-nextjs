// src/app/(dashboard)/_components/IEditedNotesTable.tsx
import React from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {GoPencil} from "react-icons/go";
import {FcFile} from "react-icons/fc";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {HiEllipsisHorizontal} from "react-icons/hi2";
import {FcRating} from "react-icons/fc";
import {PiBroom} from "react-icons/pi";
import {CiShare1} from "react-icons/ci";
import Link from "next/link";

const NotesListEditedNotesTable = () => {
    return (
        <Table className={`w-full`}>
            <TableCaption>查看更多</TableCaption>
            <TableBody className={``}>
                <TableRow className={`group`}>
                    {/*标题*/}
                    <TableCell className={`w-[34vw] p-6`}>
                        <div className={`h-6 gap-x-2 flex items-center`}>
                            <FcFile className={`size-6`}/>
                            <span>无标题</span>
                            <Link href={`/username/knowledgeId/noteId`}
                                  className={`group-hover:block hidden`}>
                                <GoPencil className={`size-4`}/>
                            </Link>
                        </div>
                    </TableCell>
                    {/*对应知识库*/}
                    <TableCell className="w-[25vw] text-gray-600/50">
                        malguy/myNotes
                    </TableCell>
                    {/*上次编辑时间*/}
                    <TableCell>
                        昨天
                    </TableCell>
                    {/*other*/}
                    <TableCell className="">
                        <DropdownMenu>
                            <DropdownMenuTrigger
                                className={`hover:bg-slate-200 rounded-md group-hover:block hidden`}
                            >
                                <HiEllipsisHorizontal
                                    className={`size-8 p-2`}/>
                            </DropdownMenuTrigger>
                            <DropdownMenuTrigger
                                className={`hover:bg-slate-200 rounded-md group-hover:hidden block`}
                            >
                                <div
                                    className={`size-8 p-2`}/>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>
                                    <FcRating/>
                                    收藏
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <PiBroom/>
                                    移除
                                </DropdownMenuItem>
                                <DropdownMenuSeparator/>
                                <DropdownMenuItem>
                                    <CiShare1/>
                                    浏览器打开
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
};

export default NotesListEditedNotesTable;