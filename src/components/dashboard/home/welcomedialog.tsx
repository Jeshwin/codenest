"use client";

import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import {Button} from "@/components/ui/button";
import {AlertDialogTitle} from "@radix-ui/react-alert-dialog";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {AuthUser, getCurrentUser} from "aws-amplify/auth";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Camera, X} from "lucide-react";
import {Label} from "@/components/ui/label";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {uploadData} from "aws-amplify/storage";
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
    bio: z.string().max(200, "Bio must not exceed 200 characters").optional(),
});

// Convert image types into extensions
const mimeToExtension = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
    "image/gif": "gif",
    "image/webp": "webp",
    "image/svg+xml": "svg",
    "image/avif": "avif",
    "image/tiff": "tiff",
};

export default function WelcomeDialog() {
    const [showDialog, setShowDialog] = useState(false);
    const [currentUser, setCurrentUser] = useState<AuthUser>();
    const [avatarImage, setAvatarImage] = useState<string | null>(null);
    const [avatarImageType, setAvatarImageType] = useState<string | null>(null);
    const [defaultUsername, setDefaultUsername] = useState<string>();

    useEffect(() => {
        const getData = async () => {
            const data = await getCurrentUser();
            setCurrentUser(data);
        };
        getData();
    }, []);

    const form = useForm<z.infer<typeof userFormSchema>>({
        resolver: zodResolver(userFormSchema),
        defaultValues: {
            username: "",
            firstName: "",
        },
    });

    async function onSubmit(values: z.infer<typeof userFormSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
        console.log(
            avatarImage ||
                `https://api.toucanny.net/avatar?userid=${
                    currentUser?.userId
                }&w=${256}`
        );

        // Get URL to profile photo
        let profilePhotoURL;
        if (avatarImage) {
            // Upload avatar to storage
            const result = await uploadData({
                path: ({identityId}) =>
                    `profile-pictures/${identityId}/pfp.${avatarImageType}`,
                data: avatarImage,
            }).result;
            profilePhotoURL = result.path;
        } else {
            profilePhotoURL = `https://api.toucanny.net/avatar?userid=${currentUser?.userId}`;
        }

        // Create user info item
        const {errors, data: newUserInfo} = await client.models.UserInfo.create(
            {
                username: values.username,
                firstName: values.firstName,
                lastName: values.lastName ?? "",
                bio: values.bio ?? "",
                profilePhoto: profilePhotoURL,
            }
        );
        console.log(newUserInfo);
        if (errors) {
            console.error(errors);
        }
    }

    useEffect(() => {
        async function setDefUsername() {
            const defaultUsernameResponse = await fetch(
                `https://api.toucanny.net/username?userid=${currentUser?.userId}`
            );
            const newDefaultUsername = await defaultUsernameResponse.json();
            setDefaultUsername(newDefaultUsername.username);
        }
        setDefUsername();
    }, [currentUser?.userId]);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.size > 10 * 1024 * 1024) {
                alert("Image must be less than 10 MB");
                return;
            }

            const reader = new FileReader();
            reader.onload = () => {
                setAvatarImage(reader.result as string); // Set the uploaded image as the new avatar
            };
            reader.readAsDataURL(file);
            setAvatarImageType(mimeToExtension[file.type] || "unknown");
        }
    };

    const handleRemoveImage = () => {
        // Reset to default avatar
        setAvatarImage(null);
        setAvatarImageType(null);
    };

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
                    <AlertDialogDescription className="flex gap-4">
                        <div className="relative size-36 w-fit overflow-hidden mt-2">
                            <Avatar className="size-36 rounded-full">
                                <AvatarImage
                                    src={
                                        avatarImage ||
                                        `https://api.toucanny.net/avatar?userid=${
                                            currentUser?.userId
                                        }&w=${256}`
                                    }
                                    alt={currentUser?.userId}
                                    className="object-cover"
                                />
                                <AvatarFallback className="rounded-full">
                                    CN
                                </AvatarFallback>
                            </Avatar>
                            <div className="cursor-pointer absolute bottom-0 left-0 right-0 bg-background/50 flex justify-center align-middle p-2 gap-1">
                                <label className="flex items-center gap-1 cursor-pointer">
                                    <Camera className="size-4" />
                                    Edit
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageUpload}
                                    />
                                </label>
                            </div>
                            {avatarImage && (
                                <button
                                    onClick={handleRemoveImage}
                                    className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full size-6"
                                >
                                    <X className="size-4" />
                                </button>
                            )}
                        </div>
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
                            <FormField
                                control={form.control}
                                name="bio"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Bio (optional)</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Tell us a little bit about yourself"
                                                className="resize-none"
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </form>
                    </AlertDialogDescription>
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
