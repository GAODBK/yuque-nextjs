// src/app/(dashboard)/_components/notes-list.tsx
import React from 'react';
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import NotesListEditedNotesTable from "@/app/(dashboard)/_components/notes-list-edited-notes-table";

const NotesList = () => {

    return (
        <div className={`p-4 pt-0`}>
            <Tabs defaultValue="edited" className="w-full">
                <TabsList>
                    <TabsTrigger value="edited">编辑过</TabsTrigger>
                    <TabsTrigger value="viewed">浏览过</TabsTrigger>
                    <TabsTrigger value="liked">我点赞的</TabsTrigger>
                    <TabsTrigger value="commented">我评论过</TabsTrigger>
                </TabsList>
                <TabsContent value="edited">
                    <NotesListEditedNotesTable/>
                </TabsContent>
                <TabsContent value="viewed">
                    <div>
                        1
                    </div>
                </TabsContent>
                <TabsContent value="liked">
                    <div>1</div>
                </TabsContent>
                <TabsContent value="commented">
                    <div>1</div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default NotesList;