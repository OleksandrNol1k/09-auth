"use client"

import css from "./TagsMenu.module.css"
import Link from "next/link"
import { useState } from "react"
import { NoteTag } from "@/types/note";

const tags: NoteTag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

export default function TagsMenu() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={css.menuContainer}>
            <button className={css.menuButton} onClick={() => setIsOpen(!isOpen)}>
                Notes ▾
            </button>
            {isOpen && (
                <ul className={css.menuList}>
                    <li className={css.menuItem}>
                        <Link href={`/notes/filter/all`} className={css.menuLink} onClick={() => setIsOpen(!isOpen)}>All notes</Link>
                    </li>
                    {tags.map((tag) => (
                        <li key={tag} className={css.menuItem}>
                            <Link href={`/notes/filter/${tag}`} className={css.menuLink} onClick={() => setIsOpen(!isOpen)}>
                                {tag}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}