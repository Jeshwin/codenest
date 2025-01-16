"use client";

import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {AuthUser, getCurrentUser} from "aws-amplify/auth";
import {LogOut, Settings2, Sparkles, User} from "lucide-react";
import {signOut} from "aws-amplify/auth";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import Link from "next/link";
import {generateClient} from "aws-amplify/data";
import {type Schema} from "@/../amplify/data/resource";
import {getUrl} from "aws-amplify/storage";

const client = generateClient<Schema>({
    authMode: "userPool",
});

export default function UserDropdown() {
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

    const router = useRouter();
    const handleSignOut = async () => {
        await signOut();
        console.log("Returning home...");
        router.push("/");
    };

    return (
        currentUser &&
        currentUserInfo && (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="size-10 p-2">
                        <Avatar className="size-6 rounded-full">
                            <AvatarImage
                                src={avatarURL}
                                alt={currentUser?.userId}
                            />
                            <AvatarFallback className="rounded-lg">
                                CN
                            </AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mx-2 w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg">
                    <DropdownMenuLabel className="p-0 font-normal">
                        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                            <Avatar className="size-8 rounded-full">
                                <AvatarImage
                                    src={avatarURL}
                                    alt={currentUser?.userId}
                                />
                                <AvatarFallback className="rounded-lg">
                                    CN
                                </AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">
                                    {currentUserInfo.firstName}{" "}
                                    {currentUserInfo.lastName}
                                </span>
                                <span className="truncate text-xs">
                                    @{currentUserInfo.username}
                                </span>
                            </div>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground flex justify-center font-semibold">
                            <Sparkles />
                            Upgrade to Pro
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <Link href="/profile">
                            <DropdownMenuItem>
                                <User />
                                Profile
                            </DropdownMenuItem>
                        </Link>
                        <Link href="/account">
                            <DropdownMenuItem>
                                <Settings2 />
                                Account
                            </DropdownMenuItem>
                        </Link>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={handleSignOut}
                    >
                        <LogOut />
                        Log Out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        )
    );
}
