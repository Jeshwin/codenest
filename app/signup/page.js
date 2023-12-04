import Logo from "@/components/navbar/logo"
import ThemePicker from "@/components/navbar/themepicker"
import {
    faApple,
    faGithub,
    faGoogle,
    faMicrosoft,
} from "@fortawesome/free-brands-svg-icons"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"

export default function Page() {
    const SSOOptions = [
        {
            name: "Google",
            bgColor: "bg-blue-500",
            icon: faGoogle,
        },
        {
            name: "GitHub",
            bgColor: "bg-purple-500",
            icon: faGithub,
        },
        {
            name: "Apple",
            bgColor: "bg-slate-500",
            icon: faApple,
        },
        {
            name: "Microsoft",
            bgColor: "bg-teal-600",
            icon: faMicrosoft,
        },
    ]
    return (
        <body className="overflow-hidden h-screen bg-[var(--dark-bg-3)]">
            <div
                className="w-full pl-6 py-3
                flex flex-row justify-start items-center
                bg-[var(--dark-bg-1)] text-[var(--dark-fg-1)]
                absolute top-0 z-50"
            >
                <Link href="/" className="flex flex-row">
                    <Logo width={10} height={10} />
                    <span className="pt-2 text-xl font-mono">CodeNest</span>
                </Link>
                <div className="hidden">
                    <ThemePicker />
                </div>
            </div>
            <container
                className="h-full w-screen
                m-auto flex items-center justify-center
                bg-[var(--dark-bg-3)]"
            >
                <div
                    className="w-1/4 flex flex-col gap-y-5 items-center
                    px-3 py-8 rounded-xl bg-[var(--dark-bg-2)] text-[var(--dark-fg-1)]"
                >
                    <span className="pb-5 text-center text-5xl font-sans">
                        Sign Up
                    </span>
                    {SSOOptions.map((sso, index) => {
                        return (
                            <button
                                key={index}
                                className={`w-1/2 py-3 rounded-lg grid place-content-center font-sans ${sso.bgColor} hover:brightness-90 active:scale-90 transition duration-150`}
                            >
                                <span className="flex flex-row items-center">
                                    <FontAwesomeIcon
                                        icon={sso.icon}
                                        className="pr-2 h-6 w-6"
                                    />
                                    Continue with {sso.name}
                                </span>
                            </button>
                        )
                    })}
                    <button className="py-2 grid place-content-center font-sans rounded-lg hover:brightness-90 active:scale-90 transition duration-150">
                        <span className="flex flex-row items-center text-[var(--dark-fg-2)]">
                            <FontAwesomeIcon
                                icon={faEnvelope}
                                className="pr-2 h-6 w-6"
                            />
                            Continue with Email
                        </span>
                    </button>
                    <div className="pt-5">
                        <Link
                            href="/terms"
                            className="pr-2 hover:text-[var(--primary-light)] transition duration-150
                            border-r border-[var(--primary)]"
                        >
                            Terms & Conditions
                        </Link>
                        <Link
                            href="/privacy-policy"
                            className="pl-2 hover:text-[var(--primary-light)]
                            transition duration-150"
                        >
                            Privacy Policy
                        </Link>
                    </div>
                </div>
            </container>
        </body>
    )
}
