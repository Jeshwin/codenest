import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Book,
    Headset,
    HelpCircle,
    Keyboard,
    Palette,
    Settings,
    Settings2,
    Trash,
} from "lucide-react";

export default function SettingsDropdown() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="size-10 p-2">
                    <Settings />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mx-2">
                <DropdownMenuLabel>Settings</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Keyboard />
                        Keyboard Shortcuts
                        <DropdownMenuShortcut>⇧⌘K</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Palette />
                        Theme
                        <DropdownMenuShortcut>⇧⌘T</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Settings2 />
                        Preferences
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <HelpCircle />
                        Help
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Book />
                        Docs
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Headset />
                        Support
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem className="text-destructive bg-destructive/25">
                        <Trash />
                        Delete Project
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
