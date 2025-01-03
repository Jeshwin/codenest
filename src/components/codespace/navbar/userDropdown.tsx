"use client";

import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {AuthUser, getCurrentUser} from "aws-amplify/auth";
import {CreditCard, LogOut, Sparkles, User} from "lucide-react";
import {signOut} from "aws-amplify/auth";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import Image from "next/image";
import {Avatar, AvatarFallback, AvatarImage} from "@radix-ui/react-avatar";

export default function UserDropdown() {
    const [currentUser, setCurrentUser] = useState<AuthUser>();

    useEffect(() => {
        const getData = async () => {
            const data = await getCurrentUser();
            setCurrentUser(data);
        };
        getData();
    }, []);

    const router = useRouter();
    const handleSignOut = async () => {
        await signOut();
        console.log("Returning home...");
        router.push("/");
    };

    return (
        currentUser && (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="size-10 p-2">
                        <Image
                            src={`https://api.toucanny.net/avatar?userid=${
                                currentUser?.userId
                            }&w=${256}`}
                            alt="User Profile Picture"
                            width={256}
                            height={256}
                            className="size-6 rounded-full cursor-pointer"
                        />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mx-2">
                    <DropdownMenuLabel className="p-0 font-normal">
                        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage
                                    src={`https://api.toucanny.net/avatar?userid=${
                                        currentUser?.userId
                                    }&w=${256}`}
                                    alt={currentUser?.userId}
                                />
                                <AvatarFallback className="rounded-lg">
                                    CN
                                </AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">
                                    {currentUser?.userId}
                                </span>
                                <span className="truncate text-xs">
                                    {currentUser?.userId}
                                </span>
                            </div>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <Sparkles />
                            Upgrade to Pro
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuItem className="cursor-pointer">
                        <User />
                        Account
                    </DropdownMenuItem>
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
