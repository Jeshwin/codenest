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
import {LinkIcon} from "lucide-react";
import Link from "next/link";
import {useEffect, useState} from "react";
import {generateClient} from "aws-amplify/data";
import {type Schema} from "@/../amplify/data/resource";
import CreateData from "@/components/debug/createData";

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
        setAvatarURL(
            `https://api.toucanny.net/avatar?userid=${
                currentUser?.userId
            }&w=${256}`
        );
    }, [currentUser?.userId, currentUserInfo]);

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
            <CreateData />
        </div>
    );
}
