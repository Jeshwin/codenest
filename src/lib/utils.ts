import {clsx, type ClassValue} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Helper function to format count numbers into readable strings
export function formatNumber(num: number) {
    if (!num) return 0;
    if (num < 1000) {
        return num.toString(); // Display full number for anything below 1000
    }

    const units = ["k", "M", "B", "T"];
    let unitIndex = -1;

    while (num >= 1000 && unitIndex < units.length - 1) {
        num /= 1000;
        unitIndex++;
    }

    // Round to two significant figures for anything >= 1000
    return `${num.toPrecision(3)}${units[unitIndex]}`;
}
