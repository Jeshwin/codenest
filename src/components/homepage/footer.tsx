import Logo from "../common/logo";

export default function Footer() {
    const GitHubLogo = () => {
        return (
            <svg
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                className="size-4"
                viewBox="0 0 97.6 96"
            >
                <path
                    d="M48.9,0C21.8,0,0,22,0,49.2C0,71,14,89.4,33.4,95.9c2.4,0.5,3.3-1.1,3.3-2.4c0-1.1-0.1-5.1-0.1-9.1
	c-13.6,2.9-16.4-5.9-16.4-5.9c-2.2-5.7-5.4-7.2-5.4-7.2c-4.4-3,0.3-3,0.3-3c4.9,0.3,7.5,5.1,7.5,5.1c4.4,7.5,11.4,5.4,14.2,4.1
	c0.4-3.2,1.7-5.4,3.1-6.6c-10.8-1.1-22.2-5.4-22.2-24.3c0-5.4,1.9-9.8,5-13.2c-0.5-1.2-2.2-6.3,0.5-13c0,0,4.1-1.3,13.4,5.1
	c3.9-1.1,8.1-1.6,12.2-1.6s8.3,0.6,12.2,1.6c9.3-6.4,13.4-5.1,13.4-5.1c2.7,6.8,1,11.8,0.5,13c3.2,3.4,5,7.8,5,13.2
	c0,18.9-11.4,23.1-22.3,24.3c1.8,1.5,3.3,4.5,3.3,9.1c0,6.6-0.1,11.9-0.1,13.5c0,1.3,0.9,2.9,3.3,2.4C83.6,89.4,97.6,71,97.6,49.2
	C97.7,22,75.8,0,48.9,0z"
                />
            </svg>
        );
    };
    const DiscordLogo = () => {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 127.14 96.36"
                className="size-4"
            >
                <path
                    fill="#5865f2"
                    d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"
                />
            </svg>
        );
    };
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
