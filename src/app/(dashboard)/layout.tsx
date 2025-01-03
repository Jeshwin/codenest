import {Suspense} from "react";
import {AppSidebar} from "@/app/(dashboard)/sidebar";
import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar";
import TopBar from "./topbar";

export default function DashboardLayout({children}) {
    return (
        <body className="bg-muted">
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <TopBar />
                    <Suspense>{children}</Suspense>
                </SidebarInset>
            </SidebarProvider>
        </body>
    );
}
