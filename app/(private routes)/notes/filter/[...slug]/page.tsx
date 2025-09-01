import NotesClient from "./Notes.client";
import { Metadata } from "next";
import { NotesResponse } from "@/types/note";
import { fetchNotesServer } from "@/lib/api/serverApi";

interface NotesPageProps {
    params: Promise<{ slug?: string[] }>;
}

export const generateMetadata = async ({ params }: NotesPageProps): Promise<Metadata> => {
    const { slug } = await params;
    const tag = slug?.[0] && slug[0].toLowerCase() !== "all" ? slug[0] : undefined;

    return {
        title: `Notes: ${tag}`,
        description: `Notes with tag: ${tag}`,
        openGraph: {
            title: `Notes: ${tag}`,
            description: `Notes with tag: ${tag}`,
            url: `https://09-auth-ivory-two.vercel.app/notes/filter/${tag}`,
            images: [{
                url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
                width: 1200,
                height: 630,
                alt: tag,
            }]
        }
    }
}


export default async function NotesPage({ params }: NotesPageProps) {
    const { slug } = await params;
    const initialPage = 1;
    const initialQuery = "";
    const tag = slug?.[0] && slug[0].toLowerCase() !== "all" ? slug[0] : undefined;
    const initialData: NotesResponse = await fetchNotesServer({ page: initialPage, search: initialQuery, tag });
    return <NotesClient initialData={initialData} tag={tag} />
}