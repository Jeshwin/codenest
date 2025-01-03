import {
    CppIcon,
    JavaIcon,
    NodeJSIcon,
    PythonIcon,
} from "@/components/icons/languages/icons";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {ChevronDown, ListFilter, Search} from "lucide-react";

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
        <div className="container mx-10 sm:mx-auto flex flex-col gap-8 pt-6">
            <div>
                <div className="text-5xl">Templates</div>
                <div className="text-xl ml-1 mt-1">
                    Explore starter code for a variety of languages and
                    frameworks
                </div>
            </div>
            <div>
                <div className="flex justify-between mb-4">
                    <div className="text-3xl ">Featured Templates</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {featuredTemplates.map((template, index) => (
                        <div
                            className="flex gap-2 align-middle rounded-md px-3 py-2 border"
                            key={index}
                        >
                            <div className="size-10 p-2 rounded-md bg-primary">
                                <template.language className="size-6 fill-background" />
                            </div>
                            <div className="flex flex-col justify-start">
                                <div className="w-fit">{template.title}</div>
                                <div className="text-xs text-nowrap overflow-hidden text-ellipsis">
                                    {template.description}
                                </div>
                            </div>
                        </div>
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
        </div>
    );
}
