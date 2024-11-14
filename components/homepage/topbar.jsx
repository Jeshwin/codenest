import Link from "next/link";
import Logo from "../common/logo";

import ThemePicker from "../common/themepicker";
import FeatureDropdown from "./featuredropdown";
import UserInfo from "../common/userinfo";

export default function TopBar() {
    return (
        <header className="w-full flex flex-row items-center px-3 py-2 font-sans text-[var(--fg-1)] top-0 fixed z-50 bg-transparent backdrop-blur">
            <Link href="/">
                <Logo width={8} height={8} />
            </Link>
            <button className="hover:bg-[var(--bg-2)] rounded-lg px-2 py-1 mx-1 active:scale-90 duration-200">
                About
            </button>
            <FeatureDropdown />
            <button className="hover:bg-[var(--bg-2)] rounded-lg px-2 py-1 mx-1 active:scale-90 duration-200">
                Blog
            </button>
            <button className="hover:bg-[var(--bg-2)] rounded-lg px-2 py-1 mx-1 active:scale-90 duration-200">
                Languages
            </button>
            <span className="flex-grow"></span>
            <ThemePicker />
            <UserInfo />
        </header>
    );
}
