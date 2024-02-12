"use client";

import {useUser} from "@auth0/nextjs-auth0/client";

import Image from "next/image";
import {useEffect, useState} from "react";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import UserInfoCard from "./userinfocard";

export default function UserInfo() {
    const [isClicked, setIsClicked] = useState(false);
    const {user, error, isLoading} = useUser();

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await fetch("/api/profile");
                const userData = await response.json();
                console.debug(userData);
                setUserData(userData);
            } catch (error) {
                console.error("Error fetching user profile:", error.message);
            }
        };
        fetchUserProfile();
    }, []);

    if (isLoading)
        return (
            <div className="bg-[var(--bg-3)] rounded-lg px-2 py-1 mx-1 w-8 h-6 animate-pulse"></div>
        );
    if (error)
        return (
            <>
                <div className="bg-[var(--bg-error)] rounded-lg px-2 py-1 mx-1 animate-pulse">
                    {error.message}
                </div>
            </>
        );

    return (
        <>
            {!user || !userData ? (
                <a href="/api/auth/login">
                    <button className="bg-[var(--primary)] hover:bg-[var(--secondary)] rounded-lg px-2 py-1 mx-1 active:scale-90 duration-200">
                        Log In
                    </button>
                </a>
            ) : (
                <div className="relative">
                    <button
                        className="hover:bg-[var(--bg-2)] rounded-lg flex items-center px-2 py-1 mx-1 active:scale-90 duration-200"
                        onClick={() => setIsClicked(!isClicked)}
                    >
                        <Image
                            src={userData.profilePicture}
                            alt={user.name}
                            width={24}
                            height={24}
                            className="rounded-full"
                            unoptimized
                        />
                        <FontAwesomeIcon
                            icon={faChevronDown}
                            className="w-2 h-2 pl-1"
                        />
                    </button>
                    {isClicked && (
                        <div className="absolute right-0 mt-1 mr-1">
                            <UserInfoCard />
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
