"use client";

import {useEffect, useState} from "react";

import {Check, ChevronsUpDown, Heart, Plus} from "lucide-react";

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
import {cn, formatNumber} from "@/lib/utils";
import axios from "axios";
import {SidebarMenuButton} from "../ui/sidebar";
import Image from "next/image";
import {Badge} from "../ui/badge";

const templates = [
    {
        title: "C",
        value: "237e99ce-9534-4004-aaba-007ac4f40ac6",
        icon: "https://img.icons8.com/?size=100&id=Fn8H17bDpgYI&format=png&color=000000",
        author: "CodeNest",
        description: "It's Simple, C?",
        verified: true,
        tags: ["Languages"],
        likes: 400,
        uses: 9000,
    },
    {
        title: "C++",
        value: "8ff664d7-d6b4-4a99-a4ac-0629fa3136f7",
        icon: "https://img.icons8.com/?size=100&id=SQcfmIiaxhkx&format=png&color=000000",
        author: "CodeNest",
        description: "Need to pass your class? Get a C++!",
        verified: true,
        tags: ["Languages"],
        likes: 4,
        uses: 90,
    },
    {
        title: "Java",
        value: "df562a12-9cff-4fb3-8de3-cb2f7bf59cb7",
        icon: "https://img.icons8.com/?size=100&id=h91o1gYEM6Ac&format=png&color=000000",
        author: "CodeNest",
        description: "Programmers love coffee for a reason.",
        verified: false,
        tags: ["Languages"],
        likes: 4000,
        uses: 90000,
    },
    {
        title: "Node.js",
        value: "2c9625b0-04af-471b-b0a8-0c76c8f6a598",
        icon: "https://img.icons8.com/?size=100&id=phQ9SN4F3icL&format=png&color=000000",
        author: "Robert Cubeshorts",
        description: "Who lives in a pineapple under the sea?",
        verified: true,
        tags: ["Languages", "Web"],
        likes: 40000,
        uses: 9000000,
    },
    {
        title: "Flutter",
        value: "d64d0a13-aa41-481f-83b9-b9add0dd6e99",
        icon: "https://img.icons8.com/?size=100&id=asj7t1w9cjIC&format=png&color=000000",
        description:
            "I don't have any jokes for this. I genuinely like Flutter!",
        author: "Google",
        verified: false,
        tags: ["Frameworks", "Mobile"],
        likes: 4,
        uses: 9,
    },
];

function TemplateOption({
    template,
}: {
    template: {
        title: string;
        value: string;
        icon: string;
        author: string;
        description: string;
        verified: boolean;
        tags: string[];
        likes: number;
        uses: number;
    };
}) {
    return (
        <div className="flex space-x-4 w-full">
            <Image
                src={template.icon}
                alt={template.title}
                width={80}
                height={80}
                className="size-20"
            />
            <div className="flex flex-col gap-2 justify-between w-full h-16">
                <div className="flex items-center gap-1">
                    <div className="text-lg whitespace-nowrap">
                        {template.title}
                    </div>
                    {template.tags.map((tag, index) => (
                        <div
                            className="flex items-center h-fit py-1 px-2 bg-primary rounded-full text-foreground"
                            style={{
                                fontSize: "0.75rem",
                                lineHeight: "1rem",
                            }}
                            key={index}
                        >
                            {tag}
                        </div>
                    ))}
                </div>
                <div className="text-xs">{template.description}</div>
                <div className="flex justify-between">
                    <div className="text-xs whitespace-nowrap flex gap-1">
                        <Image
                            src={`https://api.toucanny.net/avatar?userid=${template.author}?width=16`}
                            alt={template.author}
                            width={16}
                            height={16}
                            className="size-4 rounded-full"
                        />
                        @{template.author}
                    </div>
                    <div className="flex gap-2">
                        <div className="flex items-center gap-0.5">
                            <Heart />
                            {formatNumber(template.likes)}
                        </div>
                        <div className="flex items-center gap-0.5">
                            <Plus />
                            {formatNumber(template.uses)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

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
            <DialogContent className="w-[500px] max-w-2xl">
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
                        modal
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
                                              framework.value ===
                                              selectedTemplate
                                      )?.title
                                    : "Select framework..."}
                                <ChevronsUpDown className="opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[480px] p-0">
                            <Command>
                                <CommandInput placeholder="Search templates..." />
                                <CommandList>
                                    <CommandEmpty>
                                        No matching templates.
                                    </CommandEmpty>
                                    <CommandGroup>
                                        {templates.map((template) => (
                                            <CommandItem
                                                key={template.value}
                                                value={template.value}
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
                                                className={` ${
                                                    selectedTemplate ===
                                                    template.value
                                                        ? "border border-primary"
                                                        : ""
                                                }`}
                                            >
                                                <TemplateOption
                                                    template={template}
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
