"use client";

import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import {Button} from "@/components/ui/button";
import {AlertDialogTitle} from "@radix-ui/react-alert-dialog";
import {getCurrentUser} from "aws-amplify/auth";
import {Input} from "@/components/ui/input";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {generateClient} from "aws-amplify/data";
import {type Schema} from "@/../amplify/data/resource";

const client = generateClient<Schema>({
    authMode: "userPool",
});

const userFormSchema = z.object({
    username: z
        .string()
        .min(3, "Username must be at least 3 characters long")
        .max(32, "Username must not exceed 32 characters")
        .regex(
            /^[a-zA-Z0-9_]+$/,
            "Username can only contain alphanumeric characters and underscores"
        )
        .refine(
            async (username) => {
                const {data: users, errors} = await client.models.UserInfo.list(
                    {
                        filter: {
                            username: {
                                eq: username,
                            },
                        },
                    }
                );
                return users.length == 0;
            },
            {
                message: "Username already exists",
            }
        ),
    firstName: z
        .string()
        .min(1, "First Name is required")
        .max(50, "First Name must not exceed 50 characters"),
    lastName: z
        .string()
        .max(50, "Last Name must not exceed 50 characters")
        .optional(),
});

export default function WelcomeDialog() {
    const [showDialog, setShowDialog] = useState(false);
    const [defaultUsername, setDefaultUsername] = useState<string>();

    useEffect(() => {
        const getData = async () => {
            const data = await getCurrentUser();
            const defaultUsernameResponse = await fetch(
                `https://api.toucanny.net/username?userid=${data.userId}`
            );
            const newDefaultUsername = await defaultUsernameResponse.json();
            setDefaultUsername(newDefaultUsername.username);
        };
        getData();
    }, []);

    const form = useForm<z.infer<typeof userFormSchema>>({
        resolver: zodResolver(userFormSchema),
        defaultValues: {
            username: defaultUsername,
            firstName: "",
        },
    });

    async function onSubmit(values: z.infer<typeof userFormSchema>) {
        // Do something with the form values.
        // This will be type-safe and validated.

        const {errors, data: newUserInfo} = await client.models.UserInfo.create(
            {
                // @ts-ignore
                username: values.username,
                // @ts-ignore
                firstName: values.firstName,
                // @ts-ignore
                lastName: values.lastName ?? "",
            }
        );
        console.log(newUserInfo);
        if (errors) {
            console.error(errors);
        }
    }

    useEffect(() => {
        const hasSeenWelcomeDialog = Cookies.get("hasSeenWelcomeDialog");
        if (!hasSeenWelcomeDialog || hasSeenWelcomeDialog === "false") {
            Cookies.set("hasSeenWelcomeDialog", "false", {expires: 365});
            setShowDialog(true);
        }
    }, []);

    const handleCloseDialog = () => {
        Cookies.set("hasSeenWelcomeDialog", "true", {expires: 365});
        setShowDialog(false);
    };

    return (
        <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
            <Form {...form}>
                <AlertDialogContent
                    className="w-fit max-w-2xl"
                    onEscapeKeyDown={(e) => e.preventDefault()}
                >
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-2xl font-semibold">
                            Welcome to CodeNest!
                        </AlertDialogTitle>
                    </AlertDialogHeader>
                    <div className="flex gap-4">
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="w-fit flex flex-col gap-4"
                        >
                            <FormField
                                control={form.control}
                                name="username"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder={defaultUsername}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex gap-4">
                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({field}) => (
                                        <FormItem className="w-1/2">
                                            <FormLabel>First Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Jane"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="lastName"
                                    render={({field}) => (
                                        <FormItem className="w-1/2">
                                            <FormLabel>
                                                Last Name (optional)
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Doe"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </form>
                    </div>
                    <AlertDialogFooter>
                        <Button
                            onClick={() => {
                                form.handleSubmit((values) => {
                                    onSubmit(values); // Submit the form
                                    handleCloseDialog(); // Close the dialog
                                })();
                            }}
                        >
                            Continue
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </Form>
        </AlertDialog>
    );
}
