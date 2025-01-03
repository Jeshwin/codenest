"use client";

import {FormEvent, useState} from "react";
import {
    autoSignIn,
    confirmSignUp,
    resendSignUpCode,
    signIn,
} from "aws-amplify/auth";
import Link from "next/link";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Eye, EyeClosed} from "lucide-react";
import GitHubLogo from "@/components/icons/github";
import GoogleLogo from "@/components/icons/google";
import {InputOTP, InputOTPGroup, InputOTPSlot} from "@/components/ui/input-otp";
import {useRouter} from "next/navigation";
import CooldownButton from "@/components/login/cooldownButton";

export default function LoginPage() {
    const router = useRouter();
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
        setUser((user) => {
            return {...user, [keyName]: event.target.value};
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const {isSignedIn, nextStep} = await signIn({
                username: user.username,
                password: user.password,
            });
            console.dir({isSignedIn, nextStep});
            if (isSignedIn || nextStep.signInStep === "DONE") {
                router.push("/codespace");
            } else if (nextStep.signInStep === "CONFIRM_SIGN_UP") {
                resendSignUpCode({
                    username: user.username,
                });
                setIsVerificationStep(true); // Transition to verification step
            }
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

    const handleVerificationSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Verification code submitted:", verificationCode);
        // Add verification logic here
        const {isSignUpComplete, nextStep} = await confirmSignUp({
            username: user.username,
            confirmationCode: verificationCode,
        });
        console.dir({isSignUpComplete, nextStep});
        if (isSignUpComplete) {
            console.log("Verification code valid! Welcome!");
            await autoSignIn();
            router.push("/home");
        }
    };

    const resendVerificationCode = () => {
        resendSignUpCode({
            username: user.username,
        });
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
                        src="/coollogo.png"
                        alt="3D CodeNest Logo!"
                        width={384}
                        height={384}
                        className="size-96 object-cover rounded-lg transform"
                    />
                </div>
                <div className="relative w-full overflow-hidden">
                    {/** Login Form */}
                    <div
                        className={`absolute top-0 left-0 w-full p-16 flex flex-col space-y-4 align-middle duration-300 transition-[transform,opacity] transform ${
                            isVerificationStep
                                ? "-translate-x-full opacity-0"
                                : "translate-x-0 opacity-100"
                        }`}
                    >
                        <div className="text-4xl font-medium">Login</div>
                        <div className="text-sm">
                            Don&apos;t have an account?{" "}
                            <Link href="/register" className="text-primary">
                                <Button variant="link" className="p-0 m-0">
                                    Register
                                </Button>
                            </Link>
                        </div>
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col justify-center space-y-4"
                        >
                            <Input
                                type="email"
                                id="username"
                                placeholder="Email"
                                value={user.username}
                                onChange={(e) =>
                                    handleInputChange(e, "username")
                                }
                            />
                            <div className="relative w-full h-fit">
                                <Input
                                    type={passwordType}
                                    id="password"
                                    placeholder="Password"
                                    value={user.password}
                                    onChange={(e) =>
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
                            <Button type="submit">Log In</Button>
                            <div className="flex items-center w-full space-x-2">
                                <div className="h-px bg-accent-foreground flex-1"></div>
                                <div className="text-xs text-accent-foreground">
                                    Or continue with
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
                        </form>
                    </div>
                    {/** Verification Form */}
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
                        <div className="h-10 flex items-center text-sm">
                            Check your inbox at{" "}
                            {user.username.length > 0
                                ? user.username
                                : "coda@codenest.space"}
                        </div>
                        <form
                            onSubmit={handleVerificationSubmit}
                            className="pt-6 flex flex-col justify-center space-y-4"
                        >
                            <div className="w-full self-center pb-8">
                                <InputOTP
                                    maxLength={6}
                                    value={verificationCode}
                                    onChange={(value) =>
                                        setVerificationCode(value)
                                    }
                                >
                                    <InputOTPGroup className="*:bg-background w-full justify-center">
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                        <InputOTPSlot index={3} />
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                </InputOTP>
                            </div>
                            <Button variant="secondary" type="submit">
                                Submit
                            </Button>
                            <CooldownButton
                                variant="ghost"
                                onClick={resendVerificationCode}
                            >
                                Resend Code
                            </CooldownButton>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
