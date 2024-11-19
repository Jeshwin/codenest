import GitHubLogo from "@/components/icons/github";
import Logo from "../../components/logo";
import DiscordLogo from "@/components/icons/discord";

export default function Footer() {
    return (
        <div className="w-full bg-muted">
            <div className="w-5/6 mx-auto h-fit py-10 font-sans grid grid-cols-3 gap-x-4">
                <div className="w-full h-fit grid grid-cols-1 gap-y-4">
                    <div className="h-fit bg-accent rounded-lg p-4">
                        <div className="h-8 flex flex-row items-end">
                            <Logo size={8} />
                            <span className="text-xl font-mono font-extralight">
                                CodeNest
                            </span>
                        </div>
                        <span className="text-sm">
                            Copyright © 2023 CodeNest. All rights reserved.
                        </span>
                    </div>
                    <div className="w-full h-full bg-accent rounded-lg p-4">
                        <span className="text-lg font-semibold">
                            Social Media
                        </span>
                        <ul className="flex flex-col gap-y-1">
                            <li className="flex items-center space-x-2">
                                <GitHubLogo />
                                <a href="https://github.com/Jeshwin/codenest">
                                    GitHub
                                </a>
                            </li>
                            <li className="flex items-center space-x-2">
                                <DiscordLogo />
                                <a href="https://discord.com">Discord</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="w-full h-fit bg-accent rounded-lg p-4">
                    <span className="text-lg font-semibold">Links</span>
                    <ul className="pl-4 flex flex-col gap-y-1">
                        <li>About Us</li>
                        <li>Contact</li>
                        <li>Docs</li>
                        <li>Blog</li>
                        <li>Languages</li>
                        <li>Acknowledgements</li>
                    </ul>
                </div>
                <div className="w-full h-fit bg-accent rounded-lg p-4">
                    <span className="text-lg font-semibold">Features</span>
                    <ul className="pl-4 flex flex-col gap-y-1">
                        <li>Code Editor</li>
                        <li>CloudShell</li>
                        <li>Environments</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
