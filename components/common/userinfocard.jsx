import {useEffect, useState} from "react";
import {useUser} from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faArrowRightFromBracket,
    faGears,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import LoadingSpinner from "./loadingspinner";

export default function UserInfoCard() {
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

    if (isLoading || !userData)
        return (
            <div className="w-max p-8 rounded-lg bg-[var(--bg-2)] border border-[var(--fg-3)]">
                <LoadingSpinner width={32} height={32} />
            </div>
        );
    if (error)
        return (
            <div className="w-max p-8 rounded-lg bg-[var(--bg-2)] border border-[var(--fg-3)]">
                <div>{error.message}</div>
            </div>
        );

    return (
        <div className="w-max rounded-lg bg-[var(--bg-2)] border border-[var(--fg-3)]">
            <div className="grid grid-cols-1 pt-4">
                <div className="flex flex-row px-4">
                    <Image
                        src={userData.profilePicture}
                        alt={user.name}
                        width={48}
                        height={48}
                        className="rounded-full"
                        unoptimized
                    />
                    <div className="grid grid-cols-1 ml-5">
                        <span className="text-lg font-semibold">
                            {user.name}
                        </span>
                        <span>@{userData.username}</span>
                    </div>
                </div>
                <Link
                    href="/profile"
                    className="flex flex-row items-center mt-3 pl-12 px-4 py-3 transition duration-200 hover:bg-[var(--bg-3)]"
                >
                    <FontAwesomeIcon
                        icon={faGears}
                        className="h-4 w-4 text-[var(--fg-2)]"
                    />
                    <span className="ml-4">User Profile</span>
                </Link>
                <a
                    href="/api/auth/logout"
                    className="flex flex-row items-center rounded-b-lg pl-12 py-3 px-4
                    transition duration-200 hover:bg-[var(--bg-3)]"
                >
                    <FontAwesomeIcon
                        icon={faArrowRightFromBracket}
                        className="h-4 w-4 text-[var(--fg-2)]"
                    />
                    <span className="ml-4">Sign Out</span>
                </a>
            </div>
        </div>
    );
}
