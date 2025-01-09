import TemplateCard from "@/components/dashboard/templatecard";
import {
    CppIcon,
    JavaIcon,
    NodeJSIcon,
    PythonIcon,
} from "@/components/icons/languages/icons";
import {Button} from "@/components/ui/button";
import {Card} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {
    ChevronDown,
    ListFilter,
    PlusCircle,
    Search,
    ThumbsUp,
} from "lucide-react";
import Link from "next/link";

// Sample Data
const featuredTemplates = [
    {
        title: "Python",
        description: "A blank Python file",
        language: PythonIcon,
    },
    {
        title: "C++",
        description: "Starter C++ project with Meson",
        language: CppIcon,
    },
    {
        title: "Node.js",
        description: "Blank Node.js project",
        language: NodeJSIcon,
    },
    {
        title: "Surreal Engine",
        description: "Physics engine for beginners",
        language: JavaIcon,
    },
];

export default function TemplatesPage() {
    return (
        <>
            <div>
                <div className="text-5xl">Templates</div>
                <div className="text-xl ml-1 mt-1">
                    Explore starter code for a variety of languages and
                    frameworks
                </div>
            </div>
            <div>
                <div className="h-10 flex justify-between mb-4">
                    <div className="text-3xl">Featured Templates</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {featuredTemplates.map((template, index) => (
                        <TemplateCard template={template} key={index} />
                    ))}
                </div>
            </div>
            <div>
                <div className="flex justify-between mb-4">
                    <div className="text-3xl ">Search</div>
                </div>
                <div className="flex space-x-2">
                    <div className="flex-1 relative">
                        <Input className="pl-8" placeholder="Search" />
                        <Search className="size-4 absolute top-3 left-3 text-accent-foreground" />
                    </div>
                    <Button variant="outline">
                        <ListFilter />
                        Filter
                    </Button>
                    <Button variant="outline">
                        Sort by
                        <ChevronDown />
                    </Button>
                </div>
            </div>
        </>
    );
}
