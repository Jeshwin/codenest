"use client"

import Footer from "@/components/homepage/footer"
import TopBar from "@/components/homepage/topbar"
import { useUser } from "@auth0/nextjs-auth0/client"
import Image from "next/image"

export default function Page() {
    const { user, error, isLoading } = useUser()

    if (isLoading)
        return (
            <body className="h-screen bg-[var(--light-bg-3)] dark:bg-[var(--dark-bg-3)] text-[var(--light-fg-1)] dark:text-[var(--dark-fg-1)]">
                <TopBar />
                <div className="w-screen h-screen grid place-content-center">
                    <span className="text-5xl text-[var(--primary)]">
                        Loading...
                    </span>
                </div>
                <Footer />
            </body>
        )
    if (error)
        return (
            <body className="h-screen bg-[var(--light-bg-3)] dark:bg-[var(--dark-bg-3)] text-[var(--light-fg-1)] dark:text-[var(--dark-fg-1)]">
                <TopBar />
                <div className="w-screen h-screen grid place-content-center">
                    <span className="text-5xl text-[var(--bg-error)]">
                        {error.message}
                    </span>
                </div>
                <Footer />
            </body>
        )

    return (
        <body className="h-screen bg-[var(--light-bg-3)] dark:bg-[var(--dark-bg-3)] text-[var(--light-fg-1)] dark:text-[var(--dark-fg-1)]">
            <TopBar />
            <div className="w-screen h-screen grid place-content-center">
                {user ? (
                    <div className="flex flex-col items-center gap-4">
                        <Image
                            src={user.picture}
                            alt={user.name}
                            width={150}
                            height={150}
                            className="rounded-xl mx-2"
                        />
                        <span className="text-xl">{user.name}</span>
                        <span>{user.email}</span>
                    </div>
                ) : (
                    <></>
                )}
            </div>
            <Footer />
        </body>
    )
}
