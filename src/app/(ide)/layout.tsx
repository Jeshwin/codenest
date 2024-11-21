import Navbar from "./navbar";

export default function IDELayout({children}) {
    return (
        <body className="w-screen overflow-hidden h-screen">
            <Navbar />
            {children}
        </body>
    );
}
