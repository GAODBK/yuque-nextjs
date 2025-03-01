// src/app/(knowledge)/[username]/[libraryId]/_components/sidebar-search-input.tsx
import React from 'react';
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator
} from "@/components/ui/command";
import {FiClock} from "react-icons/fi";
import {TiPen} from "react-icons/ti";
import {BsClipboardData, BsJournalBookmark} from "react-icons/bs";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {GoPlus} from "react-icons/go";
import {GrDocumentText} from "react-icons/gr";
import {LuBookMarked, LuClipboardPenLine, LuTableProperties} from "react-icons/lu";
import {FcImport, FcPuzzle} from "react-icons/fc";
import {RiRobot2Line} from "react-icons/ri";

const SidebarSearchInput = () => {
    return (
        <div className={`flex items-center gap-x-2 mx-4`}>
            <Dialog>
                <DialogTrigger asChild>
                    <Input className={`cursor-pointer h-8 bg-gray-200/40`}/>
                </DialogTrigger>
                <DialogContent className={`p-0`}>
                    <Command className="rounded-lg border shadow-md md:min-w-[450px]">
                        <CommandInput placeholder="Type a command or search..."/>
                        <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            <CommandGroup heading="页面">
                                {/*todo: library children*/}

                            </CommandGroup>
                        </CommandList>
                    </Command>
                </DialogContent>
            </Dialog>
            <div
                className={`h-8 w-10 cursor-pointer border rounded-md flex items-center justify-center bg-white`}
            >
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <GoPlus className={`size-6`}/>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className={`py-4 px-2`}>
                        <DropdownMenuItem>
                            <GrDocumentText/>
                            文档
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <LuTableProperties/>
                            {/*<FcViewDetails/>*/}
                            表格
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <LuClipboardPenLine/>
                            画板
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <BsClipboardData/>
                            数据表
                        </DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem>
                            <LuBookMarked/>
                            知识库
                        </DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem>
                            <FcPuzzle/>
                            从模板新建
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <RiRobot2Line/>
                            Ai帮你写
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <FcImport/>
                            导入
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
};

export default SidebarSearchInput;