import TopBar from "@/app/(general)/topbar";
import Footer from "@/app/(general)/footer";

export default function GeneralLayout({children}) {
    return (
        <body className="h-screen">
            <TopBar />
            {children}
            <Footer />
        </body>
    );
}
