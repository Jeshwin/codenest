import {Suspense} from "react";
import Drawer from "./drawer";
import TopBar from "./topbar";

export default function DashboardLayout({children}) {
    return (
        <body className="w-screen h-screen bg-muted">
            <Drawer />
            <div>
                <TopBar />
                <Suspense>{children}</Suspense>
            </div>
        </body>
    );
}
