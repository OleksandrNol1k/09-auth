"use client"

import css from "./NoteDetails.module.css";
import { fetchNoteById } from "@/lib/api/clientApi";
import { useQuery } from "@tanstack/react-query";

interface NoteDetailsClientProps {
    id: string;
}

export default function NoteDetailsClient({id}: NoteDetailsClientProps) {
    const { data, isLoading, error } = useQuery({
        queryKey: ['note', id],
        queryFn: () => fetchNoteById(id),
        refetchOnMount: false,
    });

    if (isLoading) return <p>Loading, please wait...</p>;
    if (error || !data) return <p>Something went wrong.</p>;

    return (
        <div className={css.container}>
            <div className={css.item}>
                <div className={css.header}>
                    <h2>{data.title}</h2>
                </div>
                <p className={css.content}>{data.content}</p>
                <p className={css.date}>{data.createdAt}</p>
            </div>
        </div>
    );
}