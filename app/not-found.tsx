import css from "./Home.module.css"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Not Found",
  description: "Page not found",
  openGraph: {
    title: "Not Found",
    description: "Page not found",
    url: "",
    images: [{
      url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      width: 1200,
      height: 630,
      alt: "Not found",
    }]
  }
}

export default function NotFound() {
    return (
        <div>
            <h1 className={css.title}>404 - Page not found</h1>
            <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
        </div>
    )
}