import Navbar from "@/src/components/codespace/navbar/navbar";

export default function IDELayout({children}) {
    return (
        <body className="w-screen overflow-hidden h-screen">
            <Navbar />
            {children}
        </body>
    );
}
