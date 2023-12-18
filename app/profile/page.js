"use client"

import LoadingSpinner from "@/components/common/loadingspinner"
import Footer from "@/components/homepage/footer"
import TopBar from "@/components/homepage/topbar"
import { useUser } from "@auth0/nextjs-auth0/client"
import {
    faCheckCircle,
    faEdit,
    faTrashCan,
} from "@fortawesome/free-regular-svg-icons"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function Page() {
    const { user, error, isLoading } = useUser()
    const router = useRouter()

    const [userData, setUserData] = useState(null)

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await fetch("/api/profile")
                const userData = await response.json()
                console.debug(userData)
                setUserData(userData)
            } catch (error) {
                console.error("Error fetching user profile:", error.message)
            }
        }
        fetchUserProfile()
    }, [])

    if (isLoading || !userData)
        return (
            <body className="h-screen bg-[var(--light-bg-3)] dark:bg-[var(--dark-bg-3)] text-[var(--light-fg-1)] dark:text-[var(--dark-fg-1)]">
                <TopBar />
                <div className="w-screen h-screen grid place-content-center">
                    <LoadingSpinner width={100} height={100} />
                </div>
                <Footer />
            </body>
        )
    if (error)
        return (
            <body className="h-screen bg-[var(--light-bg-3)] dark:bg-[var(--dark-bg-3)] text-[var(--light-fg-1)] dark:text-[var(--dark-fg-1)]">
                <TopBar />
                <div className="w-screen h-screen grid place-content-center">
                    <span className="text-5xl text-[var(--bg-error)]">
                        {error.message}
                    </span>
                </div>
                <Footer />
            </body>
        )

    if (!user) router.push("/")

    return (
        <body className="h-screen bg-[var(--light-bg-3)] dark:bg-[var(--dark-bg-3)] text-[var(--light-fg-1)] dark:text-[var(--dark-fg-1)]">
            <TopBar />
            <div className="w-screen h-screen flex flex-col gap-y-8 mt-24">
                <div className="w-2/3 min-w-[24rem] mx-auto flex">
                    <div className="grow p-8 rounded-2xl bg-[var(--light-bg-1)] dark:bg-[var(--dark-bg-1)]">
                        <div className="flex flex-col lg:flex-row gap-4 items-center">
                            <Image
                                src={userData.profilePicture}
                                alt={user.name}
                                width={256}
                                height={256}
                                className="rounded-2xl lg:rounded-full w-64 h-64 lg:w-24 lg:h-24"
                                unoptimized
                            />
                            <div className="flex flex-col ml-4 gap-y-2">
                                <span className="text-3xl">
                                    {user.name}{" "}
                                    {user.email_verified && (
                                        <div className="relative inline-block group">
                                            <FontAwesomeIcon
                                                icon={faCheckCircle}
                                                className="text-[var(--bg-success)] cursor-pointer"
                                            />
                                            <div
                                                className="hidden group-hover:block w-max
                                                absolute top-4 left-8 p-2
                                                rounded-lg shadow-lg
                                                bg-[var(--light-bg-2)] dark:bg-[var(--dark-bg-2)] text-base"
                                            >
                                                Verified User
                                            </div>
                                        </div>
                                    )}
                                </span>
                                <span className="text-xl text-[var(--light-fg-2)] dark:text-[var(--dark-fg-2)]">
                                    @{userData.username}
                                </span>
                                <span className="text-[var(--light-fg-2)] dark:text-[var(--dark-fg-2)]">
                                    Joined{" "}
                                    {new Date(
                                        userData.createdAt
                                    ).toLocaleDateString("en-us", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </span>
                            </div>
                            <div className="grow flex flex-row-reverse gap-x-4">
                                <button className="text-lg px-3 py-2 rounded-lg bg-[var(--primary-light)] dark:bg-[var(--primary-dark)]">
                                    <span className="flex items-center gap-x-1">
                                        <FontAwesomeIcon icon={faEdit} />
                                        Edit
                                    </span>
                                </button>
                                <button className="text-lg px-3 py-2 bg-red-300 dark:bg-red-600 rounded-lg">
                                    <span className="flex items-center gap-x-1">
                                        <FontAwesomeIcon icon={faTrashCan} />
                                        Delete
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-2/3 min-w-[24rem] mx-auto flex">
                    <div className="grow p-8 rounded-2xl bg-[var(--light-bg-1)] dark:bg-[var(--dark-bg-1)]">
                        <div className="flex flex-row items-center mx-4">
                            <span className="text-2xl flex items-center gap-x-2">
                                Nests
                            </span>
                        </div>
                        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            <div className="w-auto m-4 rounded-2xl shadow-lg aspect-square grid place-content-center bg-[var(--light-bg-2)] dark:bg-[var(--dark-bg-2)]">
                                <FontAwesomeIcon
                                    icon={faPlus}
                                    className="w-8 h-8 text-[var(--light-fg-2)] dark:text-[var(--dark-fg-2)]"
                                />
                            </div>
                            <div className="w-auto m-4 rounded-2xl shadow-lg aspect-square grid place-content-center bg-[var(--light-bg-2)] dark:bg-[var(--dark-bg-2)]">
                                <FontAwesomeIcon
                                    icon={faPlus}
                                    className="w-8 h-8 text-[var(--light-fg-2)] dark:text-[var(--dark-fg-2)]"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </body>
    )
}
