"use client";

import BlueskyLogo from "@/components/icons/bluesky";
import DiscordLogo from "@/components/icons/discord";
import GitHubLogo from "@/components/icons/github";
import TwitterLogo from "@/components/icons/twitter";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {AuthUser, getCurrentUser} from "aws-amplify/auth";
import {Calendar, LinkIcon, Youtube} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {useEffect, useState} from "react";

export default function ProfilePage() {
    const [currentUser, setCurrentUser] = useState<AuthUser>();

    useEffect(() => {
        const getData = async () => {
            const data = await getCurrentUser();
            setCurrentUser(data);
        };
        getData();
    }, []);

    return (
        <div className="flex flex-1 flex-col gap-4">
            <div className="relative min-h-80 rounded-xl border flex px-24 py-16 overflow-hidden">
                <Avatar className="size-56 rounded-full border-4 border-background">
                    <AvatarImage
                        src={`https://api.toucanny.net/avatar?userid=${
                            currentUser?.userId
                        }&w=${256}`}
                        alt={currentUser?.userId}
                    />
                    <AvatarFallback className="rounded-full">CN</AvatarFallback>
                </Avatar>
                <div className="ml-8 flex flex-col gap-4 py-8">
                    <div>
                        <div className="text-4xl font-semibold">
                            Jeshwin Prince
                        </div>
                        <div className="text-sm">@jeshwinprince</div>
                    </div>
                    <div className="flex gap-2 items-center">
                        <Calendar />
                        Joined April 1, 1936
                    </div>
                    <div className="flex flex-wrap w-full gap-4">
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
                            href="https://github.com/"
                            className="flex gap-2 items-center"
                        >
                            <Button variant="outline">
                                <DiscordLogo />
                                Discord
                            </Button>
                        </Link>
                        <Link
                            href="https://github.com/"
                            className="flex gap-2 items-center"
                        >
                            <Button variant="outline">
                                <TwitterLogo />X
                            </Button>
                        </Link>
                        <Link
                            href="https://github.com/"
                            className="flex gap-2 items-center"
                        >
                            <Button variant="outline">
                                <BlueskyLogo />
                                Bluesky
                            </Button>
                        </Link>
                        <Link
                            href="https://github.com/"
                            className="flex gap-2 items-center"
                        >
                            <Button variant="outline">
                                <LinkIcon />
                                Website
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
