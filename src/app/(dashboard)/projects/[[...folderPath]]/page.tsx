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
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
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
        description: "A personal chatbot",
        image: "/projects/chatbot.jpg",
        language: PythonIcon,
    },
    {
        title: "Bitmap to PNG",
        description: "Exploring how computers process images",
        image: "/projects/camera.jpg",
        language: CppIcon,
    },
    {
        title: "Valorant Lite",
        description: "Entry for the 20xx CodeNest Game Jam",
        image: "/projects/videogame.jpg",
        language: NodeJSIcon,
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
                <Button size="lg">
                    <Plus className="size-6" />
                    Create Project
                </Button>
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
                <div className="flex gap-x-4 flex-wrap">
                    {projectData.map((project, index) => (
                        <Card
                            key={index}
                            className="w-80 h-fit overflow-hidden"
                        >
                            <Image
                                src={project.image}
                                alt={project.title}
                                width={320}
                                height={(320 * 9) / 16}
                                className="aspect-video object-cover"
                            />

                            <CardHeader className="relative">
                                <div className="absolute -top-6 left-6 rounded-md size-12 p-2 bg-primary border border-background">
                                    <project.language className="size-8 fill-background" />
                                </div>
                                <CardTitle>{project.title}</CardTitle>
                                <CardDescription className="w-full text-nowrap overflow-hidden text-ellipsis">
                                    {project.description}
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    );
}
