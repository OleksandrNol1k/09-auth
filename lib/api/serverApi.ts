import { cookies } from "next/headers"
import { nextServer } from "./api";
import { User } from "@/types/user";
import { FetchNotesParams, FetchNotesResponse, Note, NotesResponse } from "@/types/note";


export const checkServerSession = async () => {
    const cookieStore = cookies();
    const res = await nextServer.get("/auth/session", {
        headers: {
            Cookie: cookieStore.toString(),
        },
    });

    return res;
}

export const getServeMe = async (): Promise<User> => {
    const cookieStore = cookies();
    const { data } = await nextServer.get("users/me", {
        headers: {
            Cookie: cookieStore.toString(),
        },
    });

    return data;
}


export const fetchNotesServer = async ({tag, search, page = 1, perPage = 12}: FetchNotesParams): Promise<NotesResponse> => {
    try {
        const cookieStore = cookies();
        const res = await nextServer.get<FetchNotesResponse>("/notes", {
            params: {
                tag,
                page,
                perPage,
                ...(search?.trim() ? { search } : {}),
            },
            headers: {
                    Cookie: cookieStore.toString(),
                },
        });
        
        return {
            page,
            perPage,
            data: res.data.notes,
            totalPages: res.data.totalPages,
        };
        
    } catch (error) {
        throw error
    }
}

export const fetchNoteByIdServer = async (id: string): Promise<Note> => {
    try {
        const cookieStore = cookies();
        const res = await nextServer.get<Note>(`/notes/${id}`, {
           headers: {
                    Cookie: cookieStore.toString(),
                } 
        });
    return res.data;
    } catch (error) {
    
        throw error;
    }
}