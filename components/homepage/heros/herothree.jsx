import Image from "next/image";

export default function HeroThree() {
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
    );
}
