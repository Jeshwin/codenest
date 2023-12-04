"use client"

import TopBar from "@/components/homepage/topbar"

export default function Page() {
    return (
        <body className="overflow-hidden h-screen bg-[var(--light-bg-3)] dark:bg-[var(--dark-bg-3)]">
            <TopBar />
            <div className="h-screen w-screen mx-auto flex flex-row">
                <div className="w-[45%] bg-red-300"></div>
                <div className="w-[55%] bg-blue-300"></div>
            </div>
        </body>
    )
}
