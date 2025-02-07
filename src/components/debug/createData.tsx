"use client";

import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {ImagePlus} from "lucide-react";
import Image from "next/image";
import {v4 as uuidv4} from "uuid";
import {useRef, useState} from "react";
import {generateClient} from "aws-amplify/data";
import {type Schema} from "@/../amplify/data/resource";
import {getUrl, uploadData} from "aws-amplify/storage";
import {Button} from "../ui/button";

const client = generateClient<Schema>({
    authMode: "userPool",
});

const PROGRAMMING_LANGUAGES = [
    "JavaScript",
    "Python",
    "Java",
    "C++",
    "TypeScript",
    "Ruby",
    "Go",
    "Swift",
    "Rust",
    "PHP",
    "Custom",
];

export default function CreateData() {
    const [projectFormData, setProjectFormData] = useState({
        title: "",
        description: "",
        templateId: "",
    });
    const [templateFormData, setTemplateFormData] = useState({
        title: "",
        description: "",
        icon: "",
        language: "",
    });
    const [queryResults, setQueryResults] = useState<Object>({
        1: "Hallo",
    });

    const handleProjectFormChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const {name, value} = e.target;
        setProjectFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleProjectTemplateChange = (value: string) => {
        setProjectFormData((prev) => ({
            ...prev,
            templateId: value,
        }));
    };
    //!TODO
    const createProject = async (e) => {
        e.preventDefault();
        console.dir(projectFormData);
        const {errors, data} = await client.models.Projects.create(
            projectFormData
        );
    };

    const [isCustomLanguage, setIsCustomLanguage] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleTemplateFormChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const {name, value} = e.target;
        setTemplateFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleTemplateLanguageChange = (value: string) => {
        if (value === "Custom") {
            setIsCustomLanguage(true);
            setTemplateFormData((prev) => ({
                ...prev,
                language: "",
            }));
        } else {
            setIsCustomLanguage(false);
            setTemplateFormData((prev) => ({
                ...prev,
                language: value,
            }));
        }
    };

    const handleTemplateIconUpload = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setIsUploading(true);
            // Upload to S3 using Amplify Storage
            const fileName = uuidv4();
            const _result = await uploadData({
                path: `template-icons/${fileName}`,
                data: file,
            }).result;

            // Get the URL of the uploaded file
            const resultUrl = await getUrl({
                path: `template-icons/${fileName}`,
            });
            const iconUrl = resultUrl.url.toString();

            setTemplateFormData((prev) => ({
                ...prev,
                icon: iconUrl,
            }));
        } catch (error) {
            console.error("Error uploading file:", error);
        } finally {
            setIsUploading(false);
        }
    };
    //!TODO
    const createTemplate = async (e) => {
        e.preventDefault();
        console.dir(templateFormData);
        const {errors, data} = await client.models.Templates.create(
            templateFormData
        );
    };

    const getAllUsers = async () => {
        const {data, errors} = await client.models.UserInfo.list();
        console.dir({data, errors});
        setQueryResults(data);
    };

    const getAllProjects = async () => {
        const {data, errors} = await client.models.Projects.list();
        console.dir({data, errors});
        setQueryResults(data);
    };

    const getAllTemplates = async () => {
        const {data, errors} = await client.models.Templates.list();
        console.dir({data, errors});
        setQueryResults(data);
    };

    return (
        <div className="container flex gap-4 mb-10">
            <Card className="w-1/3 max-w-lg">
                <CardHeader>
                    <CardTitle>Create Project</CardTitle>
                </CardHeader>
                <CardContent>
                    <form
                        onSubmit={createProject}
                        className="flex flex-col space-y-2"
                    >
                        <div className="space-y-2">
                            <Label htmlFor="title">Project Title</Label>
                            <Input
                                id="title"
                                name="title"
                                value={projectFormData.title}
                                onChange={handleProjectFormChange}
                                placeholder="Enter project title"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                value={projectFormData.description}
                                onChange={handleProjectFormChange}
                                placeholder="Enter project description"
                                className="h-32"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="templateId">Template</Label>
                            <Select
                                value={projectFormData.templateId}
                                onValueChange={handleProjectTemplateChange}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a template" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="template1">
                                        Template 1
                                    </SelectItem>
                                    <SelectItem value="template2">
                                        Template 2
                                    </SelectItem>
                                    <SelectItem value="template3">
                                        Template 3
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button type="submit">Create Project</Button>
                    </form>
                </CardContent>
            </Card>
            <Card className="w-1/3 max-w-lg">
                <CardHeader>
                    <CardTitle>Create Template</CardTitle>
                </CardHeader>
                <CardContent>
                    <form
                        onSubmit={createTemplate}
                        className="flex flex-col space-y-2"
                    >
                        <div className="space-y-2">
                            <Label htmlFor="title">Template Title</Label>
                            <Input
                                id="title"
                                name="title"
                                value={templateFormData.title}
                                onChange={handleTemplateFormChange}
                                placeholder="Enter template title"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                value={templateFormData.description}
                                onChange={handleTemplateFormChange}
                                placeholder="Enter template description"
                                className="h-32"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="icon">Template Icon</Label>
                            <div className="flex items-center gap-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() =>
                                        fileInputRef.current?.click()
                                    }
                                    disabled={isUploading}
                                    className="flex items-center gap-2"
                                >
                                    <ImagePlus className="w-4 h-4" />
                                    {isUploading
                                        ? "Uploading..."
                                        : "Upload Icon"}
                                </Button>
                                {templateFormData.icon && (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={templateFormData.icon}
                                        alt="Template icon preview"
                                        className="w-12 h-12 object-cover rounded-md"
                                    />
                                )}
                            </div>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleTemplateIconUpload}
                                className="hidden"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="language">
                                Programming Language
                            </Label>
                            <Select
                                value={
                                    isCustomLanguage
                                        ? "Custom"
                                        : templateFormData.language
                                }
                                onValueChange={handleTemplateLanguageChange}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a language" />
                                </SelectTrigger>
                                <SelectContent>
                                    {PROGRAMMING_LANGUAGES.map((lang) => (
                                        <SelectItem key={lang} value={lang}>
                                            {lang}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {isCustomLanguage && (
                                <div className="mt-2">
                                    <Input
                                        name="language"
                                        value={templateFormData.language}
                                        onChange={handleTemplateFormChange}
                                        placeholder="Enter custom language"
                                    />
                                </div>
                            )}
                        </div>

                        <Button type="submit" className="w-full">
                            Create Template
                        </Button>
                    </form>
                </CardContent>
            </Card>
            <div className="w-1/3 flex flex-col gap-4">
                <div className="grid grid-cols-3 gap-4">
                    <Button variant="outline" onClick={getAllUsers}>
                        Get all users
                    </Button>
                    <Button variant="outline" onClick={getAllProjects}>
                        Get all projects
                    </Button>
                    <Button variant="outline" onClick={getAllTemplates}>
                        Get all templates
                    </Button>
                </div>
                <pre className="p-4 rounded-lg bg-foreground h-full overflow-scroll">
                    <code className="font-mono text-background">
                        {JSON.stringify(queryResults, null, 2)}
                    </code>
                </pre>
            </div>
        </div>
    );
}
