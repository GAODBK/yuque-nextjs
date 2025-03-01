// src/app/(knowledge)/[username]/[libraryId]/_components/sidebar-dir-lite-item.tsx
'use client';
import React, {useState} from 'react';
import {Note} from "@prisma/client";
import {db} from "@/lib/db";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuTrigger
} from "@/components/ui/context-menu";
import {cn} from "@/lib/utils";
import Link from "next/link";
import {
    createNote as createNoteWithParent
} from "@/app/(knowledge)/[username]/[libraryId]/[noteId]/actions/create-note";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {Input} from "@/components/ui/input";
import {updateNote} from "@/app/(knowledge)/[username]/[libraryId]/[noteId]/actions/update-note";
import {usePathname, useRouter} from "next/navigation";
import {deleteNote} from "@/app/(knowledge)/[username]/[libraryId]/actions/delete-note";

const SidebarDirLiteItem = ({notes, libraryId, level = 0}: {
    notes: Note[]
    level?: number
    libraryId: string
}) => {
    // console.log(level, notes[0].parentNoteId, notes)
    const pathname = usePathname()
    const router = useRouter()

    const [editingId, setEditingId] = useState<string | null>(null)

    const [name, setName] = useState<string | null>()

    return (
        <>
            {/*@ts-ignore*/}
            {notes && notes.length > 0 && notes.map((item) => (
                <>
                    {/*@ts-ignore*/}
                    {(item.childrenNote && item.childrenNote.length > 0) && (
                        <>
                            {(!editingId) && (
                                <Accordion type="single" collapsible>
                                    <AccordionItem value="item-1" className={`p-0 border-none`}>
                                        <AccordionTrigger key={item.id} className={`p-0 border-none`}>
                                            <ContextMenu>
                                                <ContextMenuTrigger>
                                                    <div
                                                        className={cn(
                                                            `w-full text-sm p-2 pt-2 px-${level + 4}
                                                     hover:bg-gray-300/30 rounded-md`,
                                                            pathname === `/malred/${libraryId}/${item.id}`
                                                            && `bg-gray-300/30`
                                                        )}
                                                        key={item.id}>
                                                        <Link href={`/malred/${libraryId}/${item.id}`}>
                                                            {item.name}
                                                        </Link>
                                                    </div>
                                                </ContextMenuTrigger>
                                                <ContextMenuContent>
                                                    <ContextMenuItem
                                                        onClick={() => setEditingId(item.id)}
                                                    >
                                                        重命名
                                                    </ContextMenuItem>
                                                    <ContextMenuItem
                                                        onClick={async () => {
                                                            const note = await createNoteWithParent({
                                                                libraryId,
                                                                parentNoteId: item.id
                                                            })
                                                            router.push(`/malred/${libraryId}/${note.id}`)
                                                            router.refresh()
                                                        }}
                                                    >
                                                        新建文档
                                                    </ContextMenuItem>
                                                    <ContextMenuSeparator/>
                                                    <ContextMenuItem
                                                        onClick={async () => {
                                                            await deleteNote(item.id)
                                                            router.refresh()
                                                        }}
                                                    >
                                                        删除
                                                    </ContextMenuItem>
                                                </ContextMenuContent>
                                            </ContextMenu>
                                        </AccordionTrigger>
                                        <AccordionContent className={`space-y-1 py-1 border-none`}>
                                            <SidebarDirLiteItem
                                                key={item.id}
                                                libraryId={libraryId}
                                                // @ts-ignore
                                                notes={item.childrenNote}
                                                level={level + 1}
                                            />
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>)}
                            {editingId && editingId === item.id && (
                                <Input key={item.id}
                                       onKeyDown={async (e) => {
                                           if (e.key === 'Enter') {
                                               await updateNote({
                                                   id: editingId,
                                                   name: name!
                                               })
                                               setName(null)
                                               setEditingId(null)
                                               router.refresh()
                                           }
                                       }}
                                       onBlur={() => setEditingId(null)}
                                       value={name || item.name}
                                       onChange={(e) => setName(e.target.value)}
                                />
                            )}
                        </>
                    )}
                    {/*@ts-ignore*/}
                    {(!item.childrenNote || item.childrenNote.length === 0) && (
                        <>
                            {!editingId && (
                                <ContextMenu>
                                    <ContextMenuTrigger key={item.id}>
                                        <div
                                            className={cn(
                                                `w-full text-sm p-2 pt-2 px-${level + 4}
                                                hover:bg-gray-300/30 rounded-md`,
                                                pathname === `/malred/${libraryId}/${item.id}` && `bg-gray-300/30`
                                            )}
                                            key={item.id}>
                                            <Link href={`/malred/${libraryId}/${item.id}`}>
                                                {item.name}
                                            </Link>
                                        </div>
                                    </ContextMenuTrigger>
                                    <ContextMenuContent>
                                        <ContextMenuItem
                                            onClick={() => setEditingId(item.id)}
                                        >
                                            重命名
                                        </ContextMenuItem>
                                        <ContextMenuItem
                                            onClick={async () => {
                                                const note = await createNoteWithParent({
                                                    libraryId,
                                                    parentNoteId: item.id
                                                })
                                                router.push(`/malred/${libraryId}/${note.id}`)
                                            }}
                                        >
                                            新建文档
                                        </ContextMenuItem>
                                        <ContextMenuSeparator/>
                                        <ContextMenuItem
                                            onClick={async () => {
                                                await deleteNote(item.id)
                                                router.refresh()
                                            }}
                                        >
                                            删除
                                        </ContextMenuItem>
                                    </ContextMenuContent>
                                </ContextMenu>
                            )}
                            {editingId && editingId === item.id && (
                                <Input key={item.id}
                                       onKeyDown={async (e) => {
                                           if (e.key === 'Enter') {
                                               await updateNote({
                                                   id: editingId,
                                                   name: name!
                                               })
                                               setName(null)
                                               setEditingId(null)
                                               router.refresh()
                                           }
                                       }}
                                       onBlur={() => setEditingId(null)}
                                       value={name || item.name}
                                       onChange={(e) => setName(e.target.value)}
                                />
                            )}
                        </>
                    )}
                </>
            ))}
        </>
    )
};

export default SidebarDirLiteItem;