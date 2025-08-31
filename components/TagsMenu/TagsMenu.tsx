"use client"
import css from "./TagsMenu.module.css"
import Link from "next/link"
import { useState } from "react"

const tags = ["All", "Todo", "Work", "Personal", "Meeting", "Shopping"];

export default function TagsMenu() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={css.menuContainer}>
            <button className={css.menuButton} onClick={() => setIsOpen(!isOpen)}>
                Notes ▾
            </button>
            {isOpen && (
                <ul className={css.menuList}>
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