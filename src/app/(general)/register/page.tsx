"use client";

import {useState} from "react";
import {signUp} from "aws-amplify/auth";
import {useRouter} from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import LoginImage from "@/../public/login_image.jpg";
import {Button} from "@/components/ui/button";

const Register = () => {
    const router = useRouter();
    const [user, setUser] = useState({username: "", password: ""});

    const handleInputChange = (event, keyName) => {
        event.persist();
        setUser(user => {
            return {...user, [keyName]: event.target.value};
        });
    };

    const handleSubmit = async () => {
        try {
            await signUp({
                username: user.username,
                password: user.password,
                options: {
                    userAttributes: {
                        email: user.username,
                    },
                },
            });
            router.push("/register/confirm");
        } catch (error) {
            console.log("error", error);
        }
    };

    return (
        <div className="container mx-auto h-screen grid place-content-center">
            <div className="w-full my-24 p-2 rounded-xl grid grid-cols-2 bg-accent shadow">
                <div className="w-[600px] rounded-lg relative">
                    <Image
                        src={LoginImage}
                        alt="Keyboard with Colorful Lights"
                        width={500}
                        height={750}
                        className="w-[600px] h-[700px] object-cover rounded-lg"
                    />
                </div>
                <div className="w-[600px] p-16 rounded-lg flex flex-col space-y-4 align-middle">
                    <div className="text-5xl font-semibold">
                        Create an Account
                    </div>
                    <div className="text-sm">
                        Already have an account?{" "}
                        <Link href="/login" className="text-primary">
                            Log In
                        </Link>
                    </div>
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col space-y-4"
                    >
                        <input
                            type="text"
                            value={user.username}
                            onChange={e => handleInputChange(e, "username")}
                        />
                        <input
                            type="password"
                            value={user.password}
                            onChange={e => handleInputChange(e, "password")}
                        />
                        <div className="flex items-center justify-between">
                            <Button className="w-full rounded-lg" type="submit">
                                Create Account
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
