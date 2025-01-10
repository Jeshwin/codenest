"use client";

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
} from "@/components/ui/dialog";
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

export default function WelcomeDialog() {
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        const hasSeenWelcomeDialog = Cookies.get("hasSeenWelcomeDialog");
        if (!hasSeenWelcomeDialog) {
            setShowDialog(true);
        }
    }, []);

    const handleCloseDialog = () => {
        Cookies.set("hasSeenWelcomeDialog", "true", {expires: 365}); // Set cookie for one year
        setShowDialog(false);
    };

    return (
        <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Account Setup</AlertDialogTitle>
                </AlertDialogHeader>
                <p>
                    Thank you for registering. Here&apos;s a quick guide to get
                    started.
                </p>
                <AlertDialogFooter>
                    <Button onClick={handleCloseDialog}>Get Started</Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
