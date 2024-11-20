"use client";

import {FormEvent, useState} from "react";
import {signUp} from "aws-amplify/auth";
import Link from "next/link";
import Image from "next/image";
import LoginImage from "@/../public/3D_logo.png";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Eye, EyeClosed} from "lucide-react";
import GitHubLogo from "@/components/icons/github";
import GoogleLogo from "@/components/icons/google";

export default function RegisterPage() {
    // Account Creation Data
    const [user, setUser] = useState({username: "", password: ""});
    // Toggle showing password
    const [closedEye, setClosedEye] = useState(false);
    const [passwordType, setPasswordType] = useState("password");
    // Verification step
    const [isVerificationStep, setIsVerificationStep] = useState(false);
    const [verificationCode, setVerificationCode] = useState("");

    const handleInputChange = (event, keyName) => {
        event.persist();
        setUser(user => {
            return {...user, [keyName]: event.target.value};
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            console.dir({
                username: user.username,
                password: user.password,
                options: {
                    userAttributes: {
                        email: user.username,
                    },
                },
            });
            const {isSignUpComplete, userId, nextStep} = await signUp({
                username: user.username,
                password: user.password,
                options: {
                    userAttributes: {
                        email: user.username,
                    },
                },
            });
            console.dir({isSignUpComplete, userId, nextStep});
            setIsVerificationStep(true); // Transition to verification step
        } catch (e) {
            console.error("Caught error: ", e);
        }
    };

    const togglePassword = () => {
        if (passwordType === "password") {
            setClosedEye(false);
            setPasswordType("text");
        } else {
            setClosedEye(true);
            setPasswordType("password");
        }
    };

    const handleVerificationSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Verification code submitted:", verificationCode);
        // Add verification logic here
    };

    return (
        <div className="container mx-auto h-screen grid place-content-center">
            <div className="w-full my-24 p-2 rounded-xl grid grid-cols-2 bg-accent shadow">
                <div
                    className={`rounded-lg p-16 relative duration-300 transition-colors ${
                        isVerificationStep ? "bg-secondary" : "bg-primary"
                    } grid place-content-center`}
                >
                    <Image
                        src={LoginImage}
                        alt="Keyboard with Colorful Lights"
                        width={320}
                        height={320}
                        className="size-80 object-cover rounded-lg transform"
                    />
                </div>
                <div className="relative w-full overflow-hidden">
                    <div
                        className={`w-full p-16 flex flex-col space-y-4 align-middle duration-300 transition-[transform,opacity] transform ${
                            isVerificationStep
                                ? "-translate-x-full opacity-0"
                                : "translate-x-0 opacity-100"
                        }`}
                    >
                        <div className="text-4xl font-medium">
                            Create an Account
                        </div>
                        <div className="text-sm">
                            Already have an account?{" "}
                            <Link href="/login" className="text-primary">
                                <Button variant="link" className="p-0 m-0">
                                    Log In
                                </Button>
                            </Link>
                        </div>
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col space-y-4"
                        >
                            <Input
                                type="email"
                                id="username"
                                placeholder="Email"
                                value={user.username}
                                onChange={e => handleInputChange(e, "username")}
                            />
                            <div className="relative w-full h-fit">
                                <Input
                                    type={passwordType}
                                    id="password"
                                    placeholder="Password"
                                    value={user.password}
                                    onChange={e =>
                                        handleInputChange(e, "password")
                                    }
                                />
                                <span
                                    className="absolute top-2 right-3 size-6"
                                    onClick={togglePassword}
                                >
                                    {closedEye ? (
                                        <EyeClosed className="size-6" />
                                    ) : (
                                        <Eye className="size-6" />
                                    )}
                                </span>
                            </div>
                            <Input
                                className="w-full rounded-lg text-center select-none cursor-pointer bg-primary"
                                type="submit"
                                value="Create Account"
                            />
                        </form>
                        <div className="flex items-center w-full space-x-2">
                            <div className="h-px bg-accent-foreground flex-1"></div>
                            <div className="text-xs text-accent-foreground">
                                Or register with
                            </div>
                            <div className="h-px bg-accent-foreground flex-1"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2">
                            <Button variant="outline">
                                <GoogleLogo />
                                Google
                            </Button>
                            <Button variant="outline">
                                <GitHubLogo />
                                GitHub
                            </Button>
                        </div>
                        <Button
                            className="font-mono text-green-500"
                            onClick={() => setIsVerificationStep(true)}
                        >
                            DEBUG
                        </Button>
                    </div>
                    <div
                        className={`absolute top-0 left-0 w-full p-16 flex flex-col space-y-4 align-middle duration-300 transition-[transform,opacity] transform ${
                            isVerificationStep
                                ? "translate-x-0 opacity-100"
                                : "translate-x-full opacity-0"
                        }`}
                    >
                        <div className="text-4xl font-medium">
                            Verify Your Account
                        </div>
                        <div className="text-sm">
                            Already have an account?{" "}
                            <Link href="/login" className="text-primary">
                                <Button variant="link" className="p-0 m-0">
                                    Log In
                                </Button>
                            </Link>
                        </div>
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col space-y-4"
                        >
                            <Input
                                type="email"
                                id="username"
                                placeholder="Email"
                                value={user.username}
                                onChange={e => handleInputChange(e, "username")}
                            />
                            <div className="relative w-full h-fit">
                                <Input
                                    type={passwordType}
                                    id="password"
                                    placeholder="Password"
                                    value={user.password}
                                    onChange={e =>
                                        handleInputChange(e, "password")
                                    }
                                />
                                <span
                                    className="absolute top-2 right-3 size-6"
                                    onClick={togglePassword}
                                >
                                    {closedEye ? (
                                        <EyeClosed className="size-6" />
                                    ) : (
                                        <Eye className="size-6" />
                                    )}
                                </span>
                            </div>
                            <Input
                                className="w-full rounded-lg text-center select-none cursor-pointer bg-primary"
                                type="submit"
                                value="Create Account"
                            />
                        </form>
                        <div className="flex items-center w-full space-x-2">
                            <div className="h-px bg-accent-foreground flex-1"></div>
                            <div className="text-xs text-accent-foreground">
                                Or register with
                            </div>
                            <div className="h-px bg-accent-foreground flex-1"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2">
                            <Button variant="outline">
                                <GoogleLogo />
                                Google
                            </Button>
                            <Button variant="outline">
                                <GitHubLogo />
                                GitHub
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
