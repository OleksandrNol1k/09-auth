export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

export interface Note {
    id: string;
    title: string;
    content: string;
    tag: NoteTag;
    createdAt: string;
    updatedAt: string;
    userId: string;
}

export interface FetchNotesResponse {
    notes: Note[];
    totalPages: number;
}

export interface NewNote {
    title: string;
    content: string;
    tag: NoteTag;
}

export interface FetchNotesParams{
    tag?: string;
    page?: number;
    perPage?: number;
    search?: string;
}

export interface NotesResponse{
  data: Note[];
  totalPages: number;
  page: number;
  perPage: number;
}