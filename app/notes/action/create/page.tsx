import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Note Page",
  description: "Add new note page",
  openGraph: {
    title: "New Note Page",
  description: "Add new note page",
    url: "",
    images: [{
      url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      width: 1200,
      height: 630,
      alt: "New Note Page",
    }]
  }
}

export default function CreateNote() {
    <main className={css.main}>
        <div className={css.container}>
            <h1 className={css.title}>Create note</h1>
            <NoteForm />
        </div>
    </main>
}