export const metadata = {
    title: "CodeNest Project",
    description: "A CodeNest IDE instance",
}

export default function ProjectLayout({ children }) {
    return (
        <>
            <html lang="en" className="overflow-hidden">
                <body className="h-screen bg-[var(--light-bg-3)] dark:bg-[var(--dark-bg-3)]">
                    {children}
                </body>
            </html>
        </>
    )
}
