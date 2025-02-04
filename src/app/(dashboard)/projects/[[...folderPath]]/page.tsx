import CreateProjectButton from "@/components/dashboard/createproject";
import ProjectCard from "@/components/dashboard/projectcard";
import Folders from "@/components/dashboard/projects/folders";
import {
    CppIcon,
    NodeJSIcon,
    PythonIcon,
} from "@/components/icons/languages/icons";
import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Plus} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {Fragment} from "react";

// Sample Data
const projectData = [
    {
        title: "Sirexa",
        language: PythonIcon,
        lastUpdated: new Date("December 25, 2024"),
        size: 4224216,
    },
    {
        title: "Bitmap to PNG",
        language: CppIcon,
        lastUpdated: new Date("February 20, 2022"),
        size: 167772,
    },
    {
        title: "Valorant Lite",
        language: NodeJSIcon,
        lastUpdated: new Date("January 2, 2025"),
        size: 25002048,
    },
];

const nestedFolders = ["CS 181", "Research", "Subfolder #3", "Playgrounds"];

export default async function ProjectsPage({
    params,
}: {
    params: Promise<{folderPath: undefined | string[]}>;
}) {
    const folderPath = (await params).folderPath;
    return (
        <>
            <div className="flex justify-between">
                <Breadcrumb>
                    <BreadcrumbList className="text-4xl">
                        <BreadcrumbItem>
                            {folderPath ? (
                                <BreadcrumbLink href="/projects">
                                    Projects
                                </BreadcrumbLink>
                            ) : (
                                <BreadcrumbPage>Projects</BreadcrumbPage>
                            )}
                        </BreadcrumbItem>
                        {folderPath && (
                            <BreadcrumbSeparator className="[&>svg]:w-8 [&>svg]:h-8" />
                        )}
                        {folderPath &&
                            (folderPath.length < 3 ? (
                                folderPath.map((folder, index) => (
                                    <Fragment key={index}>
                                        <BreadcrumbItem>
                                            {index === folderPath.length - 1 ? (
                                                <BreadcrumbPage>
                                                    {folder}
                                                </BreadcrumbPage>
                                            ) : (
                                                <BreadcrumbLink
                                                    href={`/projects/${folderPath
                                                        .slice(0, index + 1)
                                                        .join("/")}`}
                                                >
                                                    {folder}
                                                </BreadcrumbLink>
                                            )}
                                        </BreadcrumbItem>
                                        {index < folderPath.length - 1 && (
                                            <BreadcrumbSeparator className="[&>svg]:w-8 [&>svg]:h-8" />
                                        )}
                                    </Fragment>
                                ))
                            ) : (
                                <>
                                    <BreadcrumbItem>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger className="flex items-center gap-1">
                                                <BreadcrumbEllipsis className="h-4 w-4" />
                                                <span className="sr-only">
                                                    Toggle menu
                                                </span>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="start">
                                                {folderPath.map(
                                                    (folder, index) =>
                                                        index <
                                                        folderPath.length -
                                                            1 ? (
                                                            <Link
                                                                key={index}
                                                                href={`/projects/${folderPath
                                                                    .slice(
                                                                        0,
                                                                        index +
                                                                            1
                                                                    )
                                                                    .join(
                                                                        "/"
                                                                    )}`}
                                                            >
                                                                <DropdownMenuItem>
                                                                    {folder}
                                                                </DropdownMenuItem>
                                                            </Link>
                                                        ) : null
                                                )}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator className="[&>svg]:w-8 [&>svg]:h-8" />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>
                                            {folderPath[folderPath.length - 1]}
                                        </BreadcrumbPage>
                                    </BreadcrumbItem>
                                </>
                            ))}
                    </BreadcrumbList>
                </Breadcrumb>
                <CreateProjectButton />
            </div>

            <div>
                <div className="flex justify-between mb-4">
                    <div className="text-xl">Folders</div>
                </div>
                <Folders folders={nestedFolders} />
            </div>

            <div>
                <div className="flex justify-between mb-4">
                    <div className="text-xl">Projects</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {projectData.map((project, index) => (
                        <ProjectCard key={index} project={project} />
                    ))}
                </div>
            </div>
        </>
    );
}
