"use client"

import type { User } from "@/types/user";
import { nextServer } from "./api";
import { FetchNotesParams, FetchNotesResponse, NewNote, Note, NotesResponse } from "@/types/note";

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
}

export interface CheckSessionRequest {
    success: boolean;
}

export interface UpdateUserRequest {
    username?: string;
}

export const register = async (data: RegisterRequest): Promise<User> => {
    const res = await nextServer.post<User>("/auth/register", data);
    return res.data;
}

export const loginUser = async (data: LoginRequest): Promise<User> => {
    const res = await nextServer.post<User>("auth/login", data);
    return res.data;
}

export const logoutUser = async (): Promise<void> => {
    await nextServer.post("auth/logout");
}

export const checkSession = async (): Promise<boolean> => {
    const res = await nextServer.get<CheckSessionRequest>("/auth/session");
    return res.data.success;
}

export const getMe = async (): Promise<User> => {
    const { data } = await nextServer.get<User>("users/me");
    return data;
}

export const updateMe = async (payload: UpdateUserRequest) => {
    const res = await nextServer.patch<User>("/users/me", payload);
    return res.data;
}

export const fetchNotes = async ({ tag, search, page = 1, perPage = 12 }: FetchNotesParams): Promise<NotesResponse> => {
    try {
        const res = await nextServer.get<FetchNotesResponse>("/notes", {
            params: {
                tag,
                page,
                perPage,
                ...(search?.trim() ? { search } : {}),
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

export const createNote = async (newNote: NewNote): Promise<Note> => {
    try {
        const res = await nextServer.post<Note>("/notes", newNote, {
            headers: {
                "Content-Type": "application/json",
            },
        },
        );

        return res.data;
    } catch (error) {

        throw error;
    }
}

export const deleteNote = async (noteId: string): Promise<Note> => {
    try {
        const res = await nextServer.delete<Note>(`/notes/${noteId}`);
    return res.data;
    } catch (error) {

        throw error;
    }    
}

export const fetchNoteById = async (id: string): Promise<Note> => {
    try {
        const res = await nextServer.get<Note>(`/notes/${id}`);
    return res.data;
    } catch (error) {
    
        throw error;
    }
}