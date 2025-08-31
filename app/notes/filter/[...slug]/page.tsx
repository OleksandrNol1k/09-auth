import NotesClient from "./Notes.client";
import { fetchNotes } from "../../../../lib/api";
import { Metadata } from "next";

interface NotesPageProps {
    params: Promise<{ slug: string[] }>;
}

export const generateMetadata = async ({ params }: NotesPageProps): Promise<Metadata> => {
    const { slug } = await params;
    const tag = slug[0] === "All" ? "All notes" : slug[0];

    return {
        title: `Notes: ${tag}`,
        description: `Notes with tag: ${tag}`,
        openGraph: {
            title: `Notes: ${tag}`,
            description: `Notes with tag: ${tag}`,
            url: ``,
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
    const initialQuery = '';
    const initialTag = slug[0] === "All" ? undefined : slug[0];
    const initialData = await fetchNotes(initialPage, initialQuery, initialTag);
    return <NotesClient initialData={initialData} initialTag={initialTag} />;
}