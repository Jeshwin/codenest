import {Button} from "@/components/ui/button";
import {ChevronDown} from "lucide-react";

import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";

export default function ProjectName() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1">
                    TheRoost
                    <ChevronDown className="size-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-96 mx-12">
                <div className="grid gap-y-4">
                    <div className="text-xl font-semibold">
                        Project Customization
                    </div>
                    <div className="grid gap-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="TheRoost"
                            className="mb-2"
                        />
                    </div>
                    <div className="grid gap-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            placeholder="(Optional)"
                            className="mb-2"
                        />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <Button>Save Changes</Button>
                        <Button variant="outline">Cancel</Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
