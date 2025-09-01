"use client"

import { useEffect, useState } from "react";
import css from "./EditProfilePage.module.css"
import Image from "next/image";
import { updateMe, getMe } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";

const EditProfile = () => {
    const [user, setUser] = useState<{ username: string; email: string; avatar: string } | null>(null);
    const [userName, setUserName] = useState("");
    const router = useRouter();
    const { setUser: setGlobalUSer } = useAuthStore();

    useEffect(() => {
        getMe().then((data) => {
            setUser(data);
            setUserName(data.username ?? "");
        });
    }, []);
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(event.target.value);
    };

    const handleSaveUser = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!user || !userName.trim()) return;
        const updatedUser = await updateMe({ username: userName });

        setUser((prev) => prev ? { ...prev, username: updatedUser.username } : prev);

        setGlobalUSer(updatedUser);
    };

    const handleCancel = () => {
        router.back();
    };

    return (
        <main className={css.mainContent}>
            <div className={css.profileCard}>
                <h1 className={css.formTitle}>Edit Profile</h1>

                <Image
                    src={user?.avatar ?? "/default-avatar.png"}
                    alt="User Avatar"
                    width={120}
                    height={120}
                    className={css.avatar} />

                <form className={css.profileInfo} onSubmit={handleSaveUser}>
                    <div className={css.usernameWrapper}>
                        <label htmlFor="username">Username:</label>
                        <input id="username"
                            type="text"
                            className={css.input}
                            value={userName}
                            onChange={handleChange}
                        />
                    </div>

                    <p>Email: {user?.email}</p>

                    <div className={css.actions}>
                        <button type="submit" className={css.saveButton}>
                            Save
                        </button>
                        <button type="button" className={css.cancelButton} onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default EditProfile;