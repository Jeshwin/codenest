import Greeting from "@/components/dashboard/home/greeting";
import {
    CppIcon,
    NodeJSIcon,
    PythonIcon,
} from "@/components/icons/languages/icons";
import {Button} from "@/components/ui/button";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {BookOpen, PartyPopper, Plus, Users} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
const gettingStarted = [
    {
        action: "Join an event",
        icon: PartyPopper,
        href: "/events",
    },
    {
        action: "Find other users",
        icon: Users,
        href: "/people",
    },
    {
        action: "Read the docs",
        icon: BookOpen,
        href: "/docs",
    },
];

export default function HomePage() {
    return (
        <div className="container mx-10 sm:mx-auto flex flex-col gap-8 pt-6">
            <div>
                <Greeting />
                <div className="text-xl ml-1 mt-1">
                    What would you like to do today?
                </div>
            </div>
            <div>
                <div className="flex justify-between mb-4">
                    <div className="text-3xl ">My Projects</div>
                    <Button>
                        <Plus className="size-6" />
                        Create Project
                    </Button>
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
            <div>
                <div className="text-2xl mb-4">Getting Started</div>
                <div className="flex gap-x-4 flex-wrap">
                    {gettingStarted.map((action, index) => (
                        <Link key={index} href={action.href}>
                            <Button variant="outline">
                                <action.icon />
                                {action.action}
                            </Button>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
