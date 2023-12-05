import { useUser } from "@auth0/nextjs-auth0/client"
import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faArrowRightFromBracket,
    faGears,
} from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"

export default function UserInfoCard() {
    const { user, error, isLoading } = useUser()

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>{error.message}</div>

    return (
        <div className="w-max rounded-lg shadow-lg bg-[var(--light-bg-2)] dark:bg-[var(--dark-bg-2)]">
            <div className="grid grid-cols-1 pt-4">
                <div className="flex flex-row px-4">
                    <Image
                        src={user.picture}
                        alt={user.name}
                        width={48}
                        height={48}
                        className="rounded-full"
                    />
                    <div className="grid grid-cols-1 ml-5">
                        <span className="text-lg font-semibold">
                            {user.name}
                        </span>
                        <span>{user.email}</span>
                    </div>
                </div>
                <Link
                    href="/profile"
                    className="flex flex-row items-center mt-3 pl-12 px-4 py-3
                    transition duration-200 hover:bg-[var(--light-bg-3)] hover:dark:bg-[var(--dark-bg-3)]"
                >
                    <FontAwesomeIcon
                        icon={faGears}
                        className="h-4 w-4 text-[var(--light-fg-2)] dark:text-[var(--dark-fg-2)]"
                    />
                    <span className="ml-4">Account Settings</span>
                </Link>
                <a
                    href="/api/auth/logout"
                    className="flex flex-row items-center rounded-b-lg pl-12 py-3 px-4
                    transition duration-200 hover:bg-[var(--light-bg-3)] hover:dark:bg-[var(--dark-bg-3)]"
                >
                    <FontAwesomeIcon
                        icon={faArrowRightFromBracket}
                        className="h-4 w-4 text-[var(--light-fg-2)] dark:text-[var(--dark-fg-2)]"
                    />
                    <span className="ml-4">Sign Out</span>
                </a>
            </div>
        </div>
    )
}
