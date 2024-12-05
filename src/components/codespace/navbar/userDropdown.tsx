"use client";

import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {AuthUser, getCurrentUser} from "aws-amplify/auth";
import {CreditCard, LogOut, User} from "lucide-react";
import {signOut} from "aws-amplify/auth";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import Image from "next/image";

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
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <User />
                        Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <CreditCard />
                        Billing
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleSignOut}>
                        <LogOut />
                        Sign Out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        )
    );
}
