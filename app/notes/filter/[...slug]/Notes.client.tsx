"use client"

import css from "./NotesPage.module.css"
import { useState } from "react"
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { useDebouncedCallback } from "use-debounce"
import { fetchNotes } from "../../../../lib/api"
import NoteList from "../../../../components/NoteList/NoteList"
import Pagination from "../../../../components/Pagination/Pagination"
import SearchBox from "../../../../components/SearchBox/SearchBox"
import { FetchNoteList } from "@/types/note"
import Link from "next/link"

type NotesClientProps = {
    initialData: FetchNoteList;
    initialTag?: string;
};

export default function NotesClient({ initialData, initialTag }: NotesClientProps) {
    
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState("");
    const updateSearchQuery = useDebouncedCallback((value: string) => {
        setQuery(value);
        setPage(1);
    }, 300);
    
    const [inputValue, setInputValue] = useState("");
    const handleSearchChange = (value: string) => {
        setInputValue(value);
        updateSearchQuery(value);
    }
    
    const { data, isLoading, isError, isSuccess } = useQuery({
        queryKey: ["notes", page, query, initialTag],
        queryFn: () => fetchNotes(page, query, initialTag),
        placeholderData: keepPreviousData, initialData,
    })

    const totalPages = data?.totalPages ?? 0;

    return (
        <div className={css.app}>
            <header className={css.toolbar}>
                <SearchBox value={inputValue} onSearch={handleSearchChange} />
                {totalPages > 1 && <Pagination total={totalPages} page={page} onChange={setPage} />}
                <Link href="/notes/action/create" className={css.button}>Create note +</Link>
            </header>
            {isLoading && <strong className={css.loading}>Loading notes, please wait...</strong>}
            {isError && <strong className={css.error}>There was an error, please try again...</strong>}
            {isSuccess && <NoteList notes={data.notes} />}
        </div>
    );
}