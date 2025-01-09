import {Dot, EllipsisVertical} from "lucide-react";
import {Button} from "../ui/button";
import {Card, CardDescription, CardHeader, CardTitle} from "../ui/card";
import Image from "next/image";

export default function ProjectCard({
    project,
}: {
    project: {
        title: string;
        language: ({...props}) => JSX.Element;
        lastUpdated: Date;
        size: number;
    };
}) {
    function formatBytes(bytes: number, decimals = 2) {
        if (bytes === 0) return "0 Bytes";

        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        const fileSize = parseFloat((bytes / Math.pow(k, i)).toFixed(decimals));

        return `${fileSize} ${sizes[i]}`;
    }

    function timeAgo(date: Date) {
        const now = new Date();
        const utc1 = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
        const utc2 = Date.UTC(
            date.getFullYear(),
            date.getMonth(),
            date.getDate()
        );
        const diffInSeconds = Math.floor((utc1 - utc2) / 1000);

        if (diffInSeconds < 60) {
            return `${diffInSeconds} second${diffInSeconds > 1 ? "s" : ""} ago`;
        }

        const diffInMinutes = Math.floor(diffInSeconds / 60);
        if (diffInMinutes < 60) {
            return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
        }

        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) {
            return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
        }

        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 7) {
            return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
        }

        const diffInWeeks = Math.floor(diffInDays / 7);
        if (diffInWeeks < 4) {
            return `${diffInWeeks} week${diffInWeeks > 1 ? "s" : ""} ago`;
        }

        const diffInMonths = Math.floor(diffInDays / 30.44); // Approximate average days in a month
        if (diffInMonths < 12) {
            return `${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`;
        }

        const diffInYears = Math.floor(diffInMonths / 12);
        return `${diffInYears} year${diffInYears > 1 ? "s" : ""} ago`;
    }

    return (
        <Card className="min-w-fit h-fit">
            <div className="p-4 flex gap-4 items-center">
                <div className="rounded-md size-12 p-2 bg-primary">
                    <project.language className="size-8 fill-background" />
                </div>
                <div className="flex-1 min-w-fit">
                    <div className="text-xl">{project.title}</div>
                    <div className="flex items-center">
                        <div className="text-xs whitespace-nowrap">
                            {formatBytes(project.size)}
                        </div>
                        <Dot className="size-4" />
                        <div className="text-xs whitespace-nowrap">
                            {timeAgo(project.lastUpdated)}
                        </div>
                    </div>
                </div>
                <Button size="icon" variant="ghost">
                    <EllipsisVertical />
                </Button>
            </div>
        </Card>
    );
}
