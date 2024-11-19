import Link from "next/link";
import Logo from "../logo";

import ThemePicker from "../themepicker";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {cn} from "@/lib/utils";

export default function TopBar() {
    return (
        <header className="w-full flex flex-row items-center px-3 py-2 font-sans top-0 fixed z-50 bg-transparent backdrop-blur">
            <Link href="/">
                <Logo size={8} />
            </Link>
            <NavigationMenu className="max-w-fit bg-transparent backdrop-blur">
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <Link href="/docs" legacyBehavior passHref>
                            <NavigationMenuLink
                                className={cn(
                                    navigationMenuTriggerStyle(),
                                    "bg-transparent"
                                )}
                            >
                                About
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="/docs" legacyBehavior passHref>
                            <NavigationMenuLink
                                className={cn(
                                    navigationMenuTriggerStyle(),
                                    "bg-transparent"
                                )}
                            >
                                Languages
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="/docs" legacyBehavior passHref>
                            <NavigationMenuLink
                                className={cn(
                                    navigationMenuTriggerStyle(),
                                    "bg-transparent"
                                )}
                            >
                                Docs
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="/docs" legacyBehavior passHref>
                            <NavigationMenuLink
                                className={cn(
                                    navigationMenuTriggerStyle(),
                                    "bg-transparent"
                                )}
                            >
                                Blog
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <span className="flex-grow"></span>
            <ThemePicker />
        </header>
    );
}
