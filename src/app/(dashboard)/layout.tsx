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
                    <Suspense>
                        <div className="container px-10 mx-auto flex flex-col gap-8 pt-6">
                            {children}
                        </div>
                    </Suspense>
                </SidebarInset>
            </SidebarProvider>
        </body>
    );
}
