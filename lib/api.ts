import axios from "axios"
import type { Note, NoteTag, FetchNoteList } from "../types/note"

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export interface NewNote {
  title: string;
  content: string;
  tag: NoteTag;
}

export const fetchNotes = async (page: number, search: string, tag?: string): Promise<FetchNoteList> => {
    
  const params = {perPage: 12, page, tag, search};

  if (search.trim() !== "") {
    params.search = search;
  }

  const response = await axios.get<FetchNoteList>("/notes", {
    params,
    headers: { Authorization: `Bearer ${myKey}`, },
  });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {

    const res = await axios.get<Note>(`/notes/${id}`, {
        headers: { Authorization: `Bearer ${myKey}`, },
    });
    return res.data;
} 

export const createNote = async (newNote: NewNote): Promise<Note> => {
    
  const response = await axios.post<Note>("/notes", newNote, {
    headers: { Authorization: `Bearer ${myKey}`, },
  });
  return response.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
    
  const response = await axios.delete<Note>(`/notes/${noteId}`, {
    headers: { Authorization: `Bearer ${myKey}`, },
  });
  return response.data;
};