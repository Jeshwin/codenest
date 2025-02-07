"use client";

import ProjectCard from "@/components/dashboard/projectcard";
import TemplateCard from "@/components/dashboard/templatecard";
import BlueskyLogo from "@/components/icons/bluesky";
import DiscordLogo from "@/components/icons/discord";
import GitHubLogo from "@/components/icons/github";
import {
    CppIcon,
    JavaIcon,
    NodeJSIcon,
    PythonIcon,
} from "@/components/icons/languages/icons";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {AuthUser, getCurrentUser} from "aws-amplify/auth";
import {ImagePlus, LinkIcon} from "lucide-react";
import Link from "next/link";
import {useEffect, useRef, useState} from "react";
import {generateClient} from "aws-amplify/data";
import {type Schema} from "@/../amplify/data/resource";
import {getUrl, uploadData} from "aws-amplify/storage";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import Image from "next/image";
import {v4 as uuidv4} from "uuid";

const client = generateClient<Schema>({
    authMode: "userPool",
});

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
const templateData = [
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

const PROGRAMMING_LANGUAGES = [
    "JavaScript",
    "Python",
    "Java",
    "C++",
    "TypeScript",
    "Ruby",
    "Go",
    "Swift",
    "Rust",
    "PHP",
    "Custom",
];

const templates = [
    {
        title: "C",
        value: "237e99ce-9534-4004-aaba-007ac4f40ac6",
        icon: "https://img.icons8.com/?size=100&id=Fn8H17bDpgYI&format=png&color=000000",
        author: "CodeNest",
        verified: true,
        likes: 400,
        uses: 9000,
    },
    {
        title: "C++",
        value: "8ff664d7-d6b4-4a99-a4ac-0629fa3136f7",
        icon: "https://img.icons8.com/?size=100&id=SQcfmIiaxhkx&format=png&color=000000",
        author: "CodeNest",
        verified: true,
        likes: 4,
        uses: 90,
    },
    {
        title: "Java",
        value: "df562a12-9cff-4fb3-8de3-cb2f7bf59cb7",
        icon: "https://img.icons8.com/?size=100&id=h91o1gYEM6Ac&format=png&color=000000",
        author: "CodeNest",
        verified: false,
        likes: 4000,
        uses: 90000,
    },
    {
        title: "Node.js",
        value: "2c9625b0-04af-471b-b0a8-0c76c8f6a598",
        icon: "https://img.icons8.com/?size=100&id=phQ9SN4F3icL&format=png&color=000000",
        author: "Robert Cubeshorts",
        verified: true,
        likes: 40000,
        uses: 9000000,
    },
    {
        title: "Flutter",
        value: "d64d0a13-aa41-481f-83b9-b9add0dd6e99",
        icon: "https://img.icons8.com/?size=100&id=asj7t1w9cjIC&format=png&color=000000",
        author: "Google",
        verified: false,
        likes: 4,
        uses: 9,
    },
];

export default function ProfilePage() {
    const [currentUser, setCurrentUser] = useState<AuthUser>();
    const [currentUserInfo, setCurrentUserInfo] =
        useState<Schema["UserInfo"]["type"]>();
    const [avatarURL, setAvatarURL] = useState<string>();

    //! Dev results
    const [projectFormData, setProjectFormData] = useState({
        title: "",
        description: "",
        templateId: "",
    });
    const [templateFormData, setTemplateFormData] = useState({
        title: "",
        description: "",
        icon: "",
        language: "",
    });
    const [queryResults, setQueryResults] = useState<Object>({
        1: "Hallo",
    });

    useEffect(() => {
        const getData = async () => {
            const data = await getCurrentUser();
            setCurrentUser(data);
        };
        getData();
    }, []);

    useEffect(() => {
        if (!currentUser) return;
        // get a specific item
        async function getUserInfo() {
            const {data: userInfo, errors} = await client.models.UserInfo.list({
                filter: {
                    owner: {
                        contains: currentUser.userId,
                    },
                },
            });
            userInfo.forEach((info) => {
                console.log(info.owner);
                console.log(info.owner == currentUser.userId);
            });
            console.dir({data: userInfo, errors});
            setCurrentUserInfo(userInfo[0]);
        }
        console.log(currentUser.userId);
        getUserInfo();
    }, [currentUser]);

    useEffect(() => {
        if (!currentUserInfo) return;
        const profilePhotoPieces = currentUserInfo.profilePhoto.split("/");
        if (profilePhotoPieces[0].includes("http")) {
            setAvatarURL(
                `https://api.toucanny.net/avatar?userid=${
                    currentUser?.userId
                }&w=${256}`
            );
        } else {
            async function generateURL() {
                const generatedURL = await getUrl({
                    path: currentUserInfo.profilePhoto,
                    options: {
                        expiresIn: 86400,
                    },
                });
                console.log(generatedURL.url.toString());
                setAvatarURL(generatedURL.url.toString());
            }
            generateURL();
        }
    }, [currentUser?.userId, currentUserInfo]);

    const handleProjectFormChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const {name, value} = e.target;
        setProjectFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleProjectTemplateChange = (value: string) => {
        setProjectFormData((prev) => ({
            ...prev,
            templateId: value,
        }));
    };
    //!TODO
    const createProject = () => {
        console.dir(projectFormData);
    };

    const [isCustomLanguage, setIsCustomLanguage] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleTemplateFormChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const {name, value} = e.target;
        setTemplateFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleTemplateLanguageChange = (value: string) => {
        if (value === "Custom") {
            setIsCustomLanguage(true);
            setTemplateFormData((prev) => ({
                ...prev,
                language: "",
            }));
        } else {
            setIsCustomLanguage(false);
            setTemplateFormData((prev) => ({
                ...prev,
                language: value,
            }));
        }
    };

    const handleTemplateIconUpload = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setIsUploading(true);
            // Upload to S3 using Amplify Storage
            const fileName = uuidv4();
            const result = await uploadData({
                path: `template-icons/${fileName}`,
                data: file,
            }).result;

            // Get the URL of the uploaded file
            const iconUrl = result.path;

            setTemplateFormData((prev) => ({
                ...prev,
                icon: iconUrl,
            }));
        } catch (error) {
            console.error("Error uploading file:", error);
        } finally {
            setIsUploading(false);
        }
    };
    //!TODO
    const createTemplate = async () => {
        console.dir(templateFormData);
    };

    const getAllUsers = async () => {
        const {data, errors} = await client.models.UserInfo.list();
        console.dir({data, errors});
        setQueryResults(data);
    };

    const getAllProjects = async () => {
        const {data, errors} = await client.models.Projects.list();
        console.dir({data, errors});
        setQueryResults(data);
    };

    const getAllTemplates = async () => {
        const {data, errors} = await client.models.Templates.list();
        console.dir({data, errors});
        setQueryResults(data);
    };

    const deleteUserData = async () => {
        const {data: userInfo, errors} = await client.models.UserInfo.list();
        userInfo.forEach(
            async (info) => await client.models.UserInfo.delete({id: info.id})
        );
    };

    return (
        <div className="flex flex-1 flex-col gap-4">
            <div className="flex flex-col gap-4">
                <div className="flex space-x-2 align-middle">
                    {currentUserInfo && (
                        <>
                            <Avatar className="size-20 rounded-full border-4 border-background">
                                <AvatarImage
                                    src={avatarURL}
                                    alt={currentUser?.userId}
                                />
                                <AvatarFallback className="rounded-full">
                                    CN
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="text-5xl whitespace-nowrap">
                                    {currentUserInfo.firstName}{" "}
                                    {currentUserInfo.lastName}
                                </div>
                                <div>@{currentUserInfo.username}</div>
                            </div>
                        </>
                    )}
                    <div className="flex-1" />
                    <div className="flex flex-wrap gap-4 pr-2">
                        <Link
                            href="https://github.com/"
                            className="flex gap-2 items-center"
                        >
                            <Button variant="outline">
                                <GitHubLogo />
                                GitHub
                            </Button>
                        </Link>
                        <Link
                            href="https://discord.com/"
                            className="flex gap-2 items-center"
                        >
                            <Button variant="outline">
                                <DiscordLogo />
                                Discord
                            </Button>
                        </Link>
                        <Link
                            href="https://bsky.app/"
                            className="flex gap-2 items-center"
                        >
                            <Button variant="outline">
                                <BlueskyLogo />
                                Bluesky
                            </Button>
                        </Link>
                        <Link
                            href="https://jeshwinprince.com/"
                            className="flex gap-2 items-center"
                        >
                            <Button variant="outline">
                                <LinkIcon />
                                Website
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="text-3xl mt-2">Public Projects</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {projectData.map((project, index) => (
                        <ProjectCard key={index} project={project} />
                    ))}
                </div>
                <div className="text-3xl mt-2">Public Templates</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {templateData.map((template, index) => (
                        <TemplateCard template={template} key={index} />
                    ))}
                </div>
            </div>
            {/** Some Development Buttons */}
            <Button variant="destructive" size="lg" onClick={deleteUserData}>
                DELETE ALL USER DATA
            </Button>
            <div className="flex gap-4 mb-10">
                <Card className="w-1/3 max-w-lg">
                    <CardHeader>
                        <CardTitle>Create Project</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form
                            onSubmit={createProject}
                            className="flex flex-col space-y-2"
                        >
                            <div className="space-y-2">
                                <Label htmlFor="title">Project Title</Label>
                                <Input
                                    id="title"
                                    name="title"
                                    value={projectFormData.title}
                                    onChange={handleProjectFormChange}
                                    placeholder="Enter project title"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    value={projectFormData.description}
                                    onChange={handleProjectFormChange}
                                    placeholder="Enter project description"
                                    className="h-32"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="templateId">Template</Label>
                                <Select
                                    value={projectFormData.templateId}
                                    onValueChange={handleProjectTemplateChange}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a template" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="template1">
                                            Template 1
                                        </SelectItem>
                                        <SelectItem value="template2">
                                            Template 2
                                        </SelectItem>
                                        <SelectItem value="template3">
                                            Template 3
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button type="submit">Create Project</Button>
                        </form>
                    </CardContent>
                </Card>
                <Card className="w-1/3 max-w-lg">
                    <CardHeader>
                        <CardTitle>Create Template</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form
                            onSubmit={createTemplate}
                            className="flex flex-col space-y-2"
                        >
                            <div className="space-y-2">
                                <Label htmlFor="title">Template Title</Label>
                                <Input
                                    id="title"
                                    name="title"
                                    value={templateFormData.title}
                                    onChange={handleTemplateFormChange}
                                    placeholder="Enter template title"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    value={templateFormData.description}
                                    onChange={handleTemplateFormChange}
                                    placeholder="Enter template description"
                                    className="h-32"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="icon">Template Icon</Label>
                                <div className="flex items-center gap-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() =>
                                            fileInputRef.current?.click()
                                        }
                                        disabled={isUploading}
                                        className="flex items-center gap-2"
                                    >
                                        <ImagePlus className="w-4 h-4" />
                                        {isUploading
                                            ? "Uploading..."
                                            : "Upload Icon"}
                                    </Button>
                                    {templateFormData.icon && (
                                        <Image
                                            src={templateFormData.icon}
                                            alt="Template icon preview"
                                            className="w-12 h-12 object-cover rounded-md"
                                            width={48}
                                            height={48}
                                        />
                                    )}
                                </div>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleTemplateIconUpload}
                                    className="hidden"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="language">
                                    Programming Language
                                </Label>
                                <Select
                                    value={
                                        isCustomLanguage
                                            ? "Custom"
                                            : templateFormData.language
                                    }
                                    onValueChange={handleTemplateLanguageChange}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a language" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {PROGRAMMING_LANGUAGES.map((lang) => (
                                            <SelectItem key={lang} value={lang}>
                                                {lang}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                {isCustomLanguage && (
                                    <div className="mt-2">
                                        <Input
                                            name="language"
                                            value={templateFormData.language}
                                            onChange={handleTemplateFormChange}
                                            placeholder="Enter custom language"
                                        />
                                    </div>
                                )}
                            </div>

                            <Button type="submit" className="w-full">
                                Create Template
                            </Button>
                        </form>
                    </CardContent>
                </Card>
                <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-3 gap-4">
                        <Button variant="outline" onClick={getAllUsers}>
                            Get all users
                        </Button>
                        <Button variant="outline" onClick={getAllProjects}>
                            Get all projects
                        </Button>
                        <Button variant="outline" onClick={getAllTemplates}>
                            Get all templates
                        </Button>
                    </div>
                    <pre className="p-4 rounded-lg bg-foreground h-full">
                        <code className="font-mono text-background">
                            {JSON.stringify(queryResults, null, 2)}
                        </code>
                    </pre>
                </div>
            </div>
        </div>
    );
}
