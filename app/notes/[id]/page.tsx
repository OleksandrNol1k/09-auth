import { fetchNoteById } from "@/lib/api";
import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";
import { Metadata } from "next";

type NoteDetailsProps = { params: Promise<{ id: string }>; }
type MetadataProps = { params: Promise<{ id: string }>; }

export const generateMetadata = async ({ params }: MetadataProps): Promise<Metadata> => {
    const { id } = await params;
    const data = await fetchNoteById(id);

    return {
        title: `Note: ${data.title}`,
        description: data.content.slice(0, 30),
        openGraph: {
            title: `Note: ${data.title}`,
            description: data.content.slice(0, 30),
            url: ``,
            images: [{
                url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
                width: 1200,
                height: 630,
                alt: data.title,
            }]
        }
    }
}

export default async function NoteDetails({ params }: NoteDetailsProps) {
    const { id } = await params;
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({ queryKey: ['notes', id], queryFn: () => fetchNoteById(id) })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NoteDetailsClient />
        </HydrationBoundary>
    )
}