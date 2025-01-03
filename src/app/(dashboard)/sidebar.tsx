"use client";

import * as React from "react";
import {
    BookOpen,
    Feather,
    FileJson,
    Gauge,
    Home,
    PartyPopper,
    Plus,
    Users,
} from "lucide-react";

import NavUser from "@/components/dashboard/nav-user";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";
import Logo from "@/components/logo";
import Link from "next/link";

// This is sample data.
const data = {
    user: {
        name: "Jeshwin Prince",
        email: "m@example.com",
        avatar: "/avatar.png",
    },
    navMain: [
        {
            title: "Home",
            url: "/home",
            icon: Home,
        },
        {
            title: "Projects",
            url: "/projects",
            icon: Feather,
        },
        {
            title: "Usage",
            url: "/usage",
            icon: Gauge,
        },
    ],
    projects: [
        {
            title: "People",
            url: "/people",
            icon: Users,
        },
        {
            title: "Templates",
            url: "/templates",
            icon: FileJson,
        },
        {
            title: "Events",
            url: "/events",
            icon: PartyPopper,
        },
        {
            title: "Documentation",
            url: "/docs",
            icon: BookOpen,
        },
    ],
};

export function AppSidebar({...props}: React.ComponentProps<typeof Sidebar>) {
    const {state: SidebarState} = useSidebar();
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <Link href="/">
                            <SidebarMenuButton
                                size="lg"
                                className={`${
                                    SidebarState === "expanded"
                                        ? "flex justify-center gap-0"
                                        : "pl-1"
                                }`}
                            >
                                <div>
                                    <Logo size={6} />
                                </div>
                                <span className="truncate font-mono text-xl leading-none">
                                    CodeNest
                                </span>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                size="lg"
                                tooltip="Create Project"
                                className={`${
                                    SidebarState === "expanded"
                                        ? "flex justify-center gap-0"
                                        : "pl-1"
                                } bg-primary hover:bg-primary text-primary-foreground hover:text-primary-foreground`}
                            >
                                <div className="p-1 rounded-lg">
                                    <Plus className="size-6" />
                                </div>
                                <span className="truncate font-semibold">
                                    Create Project
                                </span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
                <SidebarGroup className="pt-0">
                    <SidebarMenu>
                        {data.navMain.map((item) => (
                            <Link href={item.url} key={item.title}>
                                <SidebarMenuItem>
                                    <SidebarMenuButton tooltip={item.title}>
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </Link>
                        ))}
                    </SidebarMenu>
                    <SidebarGroupLabel>Explore</SidebarGroupLabel>
                    <SidebarMenu>
                        {data.projects.map((item) => (
                            <Link href={item.url} key={item.title}>
                                <SidebarMenuItem>
                                    <SidebarMenuButton tooltip={item.title}>
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </Link>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
