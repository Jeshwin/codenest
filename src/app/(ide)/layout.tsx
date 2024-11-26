export default function IDELayout({children}) {
    return (
        <body className="w-screen overflow-hidden h-screen bg-muted">
            {children}
        </body>
    );
}
