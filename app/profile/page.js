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
import { faDiagramProject, faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function Page() {
    const { user, error, isLoading } = useUser()
    const router = useRouter()

    if (isLoading)
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
                <div className="w-1/2 mx-auto flex">
                    <div className="grow p-8 rounded-2xl bg-[var(--light-bg-1)] dark:bg-[var(--dark-bg-1)]">
                        <div className="flex flex-row items-center mx-4">
                            <Image
                                src={user.picture}
                                alt={user.name}
                                width={100}
                                height={100}
                                className="rounded-full"
                            />
                            <div className="flex flex-col ml-4 gap-y-2">
                                <span className="text-4xl">
                                    {user.name}{" "}
                                    {user.email_verified && (
                                        <div className="relative inline-block group">
                                            <FontAwesomeIcon
                                                icon={faCheckCircle}
                                                className="text-[var(--bg-success)] cursor-pointer"
                                            />
                                            <div
                                                className="hidden group-hover:block w-max
                                                absolute top-0 left-12 p-2
                                                rounded-lg shadow-lg
                                                bg-[var(--light-bg-2)] dark:bg-[var(--dark-bg-2)] text-base"
                                            >
                                                Verified User
                                            </div>
                                        </div>
                                    )}
                                </span>
                                <span className="text-2xl text-[var(--light-fg-2)] dark:text-[var(--dark-fg-2)]">
                                    @orange-angry-rhino
                                </span>
                            </div>
                            <div className="grow flex flex-row-reverse gap-x-4">
                                <button className="text-xl px-3 py-2 rounded-lg bg-[var(--primary-light)] dark:bg-[var(--primary-dark)]">
                                    <span className="flex items-center gap-x-1">
                                        <FontAwesomeIcon icon={faEdit} />
                                        Edit
                                    </span>
                                </button>
                                <button className="text-xl px-3 py-2 bg-red-300 dark:bg-red-600 rounded-lg">
                                    <span className="flex items-center gap-x-1">
                                        <FontAwesomeIcon icon={faTrashCan} />
                                        Delete
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-1/2 mx-auto flex">
                    <div className="grow p-8 rounded-2xl bg-[var(--light-bg-1)] dark:bg-[var(--dark-bg-1)]">
                        <div className="flex flex-row items-center mx-4">
                            <span className="text-4xl flex items-center gap-x-2">
                                <FontAwesomeIcon
                                    icon={faDiagramProject}
                                    className="w-8 h-8 text-[var(--light-fg-2)] dark:text-[var(--dark-fg-2)]"
                                />
                                Nests
                            </span>
                        </div>
                        <div className="w-1/3 m-4 rounded-2xl aspect-square grid place-content-center bg-[var(--light-bg-2)] dark:bg-[var(--dark-bg-2)]">
                            <FontAwesomeIcon
                                icon={faPlus}
                                className="w-12 h-12 text-[var(--light-fg-2)] dark:text-[var(--dark-fg-2)]"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </body>
    )
}
