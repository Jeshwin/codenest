import {PlusCircle, ThumbsUp} from "lucide-react";
import {Card} from "../ui/card";

export default function TemplateCard({
    template,
}: {
    template: {
        title: string;
        description: string;
        language: ({...props}) => JSX.Element;
    };
}) {
    return (
        <Card>
            <div className="p-4 flex gap-4 items-center">
                <div className="size-12 p-2 rounded-md bg-primary">
                    <template.language className="size-8 fill-background" />
                </div>
                <div className="flex flex-col justify-start flex-1">
                    <div className="w-fit">{template.title}</div>
                    <div className="text-xs text-nowrap overflow-hidden text-ellipsis">
                        {template.description}
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    <div className="flex text-sm items-center gap-1">
                        <PlusCircle className="size-3" />
                        12.3k
                    </div>
                    <div className="flex text-sm items-center gap-1">
                        <ThumbsUp className="size-3" />
                        988
                    </div>
                </div>
            </div>
        </Card>
    );
}
