"use client";

import {useEffect, useState} from "react";

import {Check, ChevronsUpDown, Plus} from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {cn} from "@/lib/utils";
import axios from "axios";
import {SidebarMenuButton} from "../ui/sidebar";

const templates = [
    {
        title: "C",
        icon: "https://img.icons8.com/?size=100&id=Fn8H17bDpgYI&format=png&color=000000",
        author: "CodeNest",
        verified: true,
        tags: ["Languages"],
        likes: 400,
        uses: 9000,
    },
    {
        title: "C++",
        icon: "https://img.icons8.com/?size=100&id=SQcfmIiaxhkx&format=png&color=000000",
        author: "CodeNest",
        verified: true,
        tags: ["Languages"],
        likes: 4,
        uses: 90,
    },
    {
        title: "Java",
        icon: "https://img.icons8.com/?size=100&id=h91o1gYEM6Ac&format=png&color=000000",
        author: "CodeNest",
        verified: false,
        tags: ["Languages"],
        likes: 4000,
        uses: 90000,
    },
    {
        title: "Node.js",
        icon: "https://img.icons8.com/?size=100&id=phQ9SN4F3icL&format=png&color=000000",
        author: "Robert Cubeshorts",
        verified: true,
        tags: ["Languages", "Web"],
        likes: 40000,
        uses: 9000000,
    },
    {
        title: "Flutter",
        icon: "https://img.icons8.com/?size=100&id=asj7t1w9cjIC&format=png&color=000000",
        author: "Google",
        verified: false,
        tags: ["Frameworks", "Mobile"],
        likes: 4,
        uses: 9,
    },
];

export default function CreateProjectButton({
    sidebar,
    SidebarState = "",
}: {
    sidebar: boolean;
    SidebarState?: "expanded" | "collapsed" | "";
}) {
    const [defaultName, setDefaultName] = useState<string>();
    const [openTemplateSelect, setOpenTemplateSelect] =
        useState<boolean>(false);
    const [selectedTemplate, setSelectedTemplate] = useState<string>("");

    useEffect(() => {
        axios
            .get(
                `https://api.toucanny.net/username?userid=${new Date().toString()}`
            )
            .then((res) => {
                console.log(res);
                setDefaultName(res.data.username);
            });
    });

    return (
        <Dialog>
            <DialogTrigger asChild>
                {sidebar ? (
                    <SidebarMenuButton
                        size="lg"
                        tooltip="Create Project"
                        className={`${
                            SidebarState === "expanded"
                                ? "flex justify-center gap-0"
                                : "pl-1"
                        } bg-primary hover:bg-primary/90 text-primary-foreground hover:text-primary-foreground`}
                    >
                        <div className="p-1 rounded-lg">
                            <Plus className="size-6" />
                        </div>
                        <span className="truncate font-semibold">
                            Create Project
                        </span>
                    </SidebarMenuButton>
                ) : (
                    <Button>
                        <Plus className="size-6" />
                        Create Project
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="w-fit max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Create Project</DialogTitle>
                    <DialogDescription>
                        Choose a language or a template and get started!
                    </DialogDescription>
                </DialogHeader>
                <form className="flex flex-col gap-4">
                    <Label htmlFor="project-name">Name</Label>
                    <Input id="project-name" defaultValue={defaultName}></Input>
                    <Label>Template</Label>
                    <Popover
                        open={openTemplateSelect}
                        onOpenChange={setOpenTemplateSelect}
                    >
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={openTemplateSelect}
                                className="w-full justify-between"
                            >
                                {selectedTemplate
                                    ? templates.find(
                                          (framework) =>
                                              framework.title ===
                                              selectedTemplate
                                      )?.title
                                    : "Select framework..."}
                                <ChevronsUpDown className="opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0">
                            <Command>
                                <CommandInput placeholder="Search framework..." />
                                <CommandList>
                                    <CommandEmpty>
                                        No framework found.
                                    </CommandEmpty>
                                    <CommandGroup>
                                        {templates.map((template) => (
                                            <CommandItem
                                                key={template.title}
                                                value={template.title}
                                                onSelect={(currentValue) => {
                                                    setSelectedTemplate(
                                                        currentValue ===
                                                            selectedTemplate
                                                            ? ""
                                                            : currentValue
                                                    );
                                                    setOpenTemplateSelect(
                                                        false
                                                    );
                                                }}
                                            >
                                                {template.title}
                                                <Check
                                                    className={cn(
                                                        "ml-auto",
                                                        selectedTemplate ===
                                                            template.title
                                                            ? "opacity-100"
                                                            : "opacity-0"
                                                    )}
                                                />
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </form>
            </DialogContent>
        </Dialog>
    );
}
