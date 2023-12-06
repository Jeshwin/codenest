import Link from "next/link"
import Logo from "../common/logo"

import ThemePicker from "../common/themepicker"
import FeatureDropdown from "./featuredropdown"
import UserInfo from "../common/userinfo"

export default function TopBar() {
    return (
        <div className="absolute w-full">
            <header
                className="w-full flex flex-row items-center px-3 py-2 font-sans
        bg-[var(--light-bg-1)] dark:bg-[var(--dark-bg-1)]
        text-[var(--light-fg-1)] dark:text-[var(--dark-fg-1)]
        top-0 fixed z-50"
            >
                <Link href="/">
                    <Logo width={8} height={8} />
                </Link>
                <button
                    className="hover:bg-[var(--light-bg-2)] hover:dark:bg-[var(--dark-bg-2)]
                rounded-lg px-2 py-1 mx-1 active:scale-90 duration-200"
                >
                    About
                </button>
                <FeatureDropdown />
                <button
                    className="hover:bg-[var(--light-bg-2)] hover:dark:bg-[var(--dark-bg-2)]
                rounded-lg px-2 py-1 mx-1 active:scale-90 duration-200"
                >
                    Blog
                </button>
                <button
                    className="hover:bg-[var(--light-bg-2)] hover:dark:bg-[var(--dark-bg-2)]
                rounded-lg px-2 py-1 mx-1 active:scale-90 duration-200"
                >
                    Languages
                </button>
                <span className="flex-grow"></span>
                <ThemePicker />
                <UserInfo />
            </header>
        </div>
    )
}
