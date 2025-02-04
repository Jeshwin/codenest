import TopBar from "@/app/(account)/topbar";
import Footer from "@/app/(account)/footer";

export default function GeneralLayout({children}) {
    return (
        <body className="h-screen">
            <TopBar />
            {children}
            <Footer />
        </body>
    );
}
