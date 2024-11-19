import TopBar from "@/src/components/homepage/topbar";

export default function GeneralLayout({children}) {
    return (
        <body className="h-screen">
            <TopBar />
            {children}
        </body>
    );
}
