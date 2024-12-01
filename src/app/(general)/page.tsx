"use client";

import {Button} from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/components/logo";
import TypewriterText from "@/components/typewritertext";
import {ArrowDown} from "lucide-react";
import StyleCanvas from "@/components/homepage/stylecanvas";
import CodeEditor from "@/components/codespace/codemirror/mirror";

export default function HomePage() {
    const supportedLanguages = [
        "NodeJS",
        "Python",
        "HTML5",
        "Rust",
        "C",
        "C++",
        "CSharp",
        "Bash",
        "And More!",
    ];

    return (
        <>
            {/** Intro Hero */}
            <div>
                <div className="z-10 absolute w-screen h-screen grid grid-cols-1 gap-y-8 place-content-center">
                    <div className="w-2/3 mx-auto pt-10 flex flex-row justify-center items-end place-items-center">
                        <div className="size-32">
                            <Logo size={32} />
                        </div>
                        <TypewriterText text={"CodeNest"} />
                    </div>
                    <Link href="/codespace" className="w-fit mx-auto">
                        <Button size="lg">Get Started!</Button>
                    </Link>
                    <div className="w-auto mx-auto mt-4">
                        <ArrowDown className="size-8 animate-bounce z-10" />
                    </div>
                </div>
                <StyleCanvas />
            </div>
            {/** Hero One */}
            <div className="h-screen flex place-items-center bg-[var(--bg-3)] text-[var(--fg-1)]">
                <div className="w-2/3 h-1/2 mx-auto flex flex-row gap-4 justify-center items-center place-items-center">
                    <div className="w-1/2 text-5xl text-center font-mono font-light">
                        A fully featured, web based coding environment
                    </div>
                    <div className="w-1/2 h-full rounded-lg bg-[var(--bg-1)] flex flex-col">
                        {/* <CodeEditor /> */}
                    </div>
                </div>
            </div>
            {/** Hero Two */}
            <div className="h-screen flex place-items-center bg-[var(--bg-1)] text-[var(--fg-1)]">
                <div className="w-2/3 h-1/2 mx-auto flex flex-row gap-4 justify-center items-center place-items-center">
                    <ul className="w-1/2 h-full p-4 font-mono rounded-lg bg-[var(--bg-2)] flex flex-col">
                        <li>
                            <span className="text-[var(--term-green)]">
                                codenest@codenest
                            </span>
                            :<span className="text-[var(--term-blue)]">~</span>#
                            echo &quot;Hello, CodeNest&quot;
                        </li>
                        <li>Hello, CodeNest</li>
                        <li>
                            <span className="text-[var(--term-green)]">
                                codenest@codenest
                            </span>
                            :<span className="text-[var(--term-blue)]">~</span>#
                            cd project
                        </li>
                        <li>
                            <span className="text-[var(--term-green)]">
                                codenest@codenest
                            </span>
                            :
                            <span className="text-[var(--term-blue)]">
                                project
                            </span>
                            # python script.py
                        </li>
                        <li>Hello, CodeNest!</li>
                        <li>
                            <span className="text-[var(--term-green)]">
                                codenest@codenest
                            </span>
                            :
                            <span className="text-[var(--term-blue)]">
                                project
                            </span>
                            # exit
                            <span className="animate-blink">|</span>
                        </li>
                    </ul>
                    <div className="w-1/2 text-5xl text-center font-mono font-light">
                        Remotely access your code through Cloud Shell
                    </div>
                </div>
            </div>
            {/** Hero Three */}
            <div className="h-screen flex place-items-center bg-[var(--bg-3)] text-[var(--fg-1)]">
                <div className="w-2/3 h-1/2 mx-auto flex flex-row gap-4 justify-center items-center place-items-center">
                    <div className="w-1/2 text-5xl text-center font-mono font-light">
                        Supports the most popular languages and frameworks
                    </div>
                    <div className="w-1/2 h-full grid grid-cols-3 place-content-center gap-4">
                        {supportedLanguages.map((language, index) => (
                            <button
                                key={index}
                                className="grid gap-4 group place-content-center justify-items-center"
                            >
                                {language !== "And More!" && (
                                    <div className="relative w-fit aspect-square">
                                        <Image
                                            width={120}
                                            height={120}
                                            src={`/languages/${language}_logo.png`}
                                            alt={language}
                                            className="grayscale transition transform-gpu duration-300 group-hover:scale-110 filter group-hover:filter-none"
                                        />
                                    </div>
                                )}
                                <span
                                    className={`text-2xl text-center duration-300 ${
                                        language !== "And More!"
                                            ? "scale-0 group-hover:scale-100"
                                            : "group-hover:scale-110 group-hover:text-[var(--primary)]"
                                    }`}
                                >
                                    {language === "CSharp" ? "C#" : language}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            {/** Get Started Hero */}
            <div className="h-[50vh] flex place-items-center bg-gradient-to-b from-background via-accent to-muted">
                <div className="w-2/3 h-full mx-auto flex flex-col justify-center items-center place-items-center">
                    <span className="text-5xl font-mono mb-10">
                        Get Started Today!
                    </span>
                    <Link href="/codespace">
                        <Button size="lg">Enter CodeNest</Button>
                    </Link>
                </div>
            </div>
        </>
    );
}
