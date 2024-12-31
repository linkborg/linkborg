'use client'

import { Button } from "@/components/ui/button"
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PieChart, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Site } from "@prisma/client";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

export const EditSiteForm = ({ site }: { site: Site }) => {
    const [name, setName] = useState(site.name || "");
    const [description, setDescription] = useState(site.description || "");
    const [logo, setLogo] = useState(site.logo || "");
    const [image, setImage] = useState(site.image || "");
    const [analyticsCode, setAnalyticsCode] = useState(site.analytics_code || "");
    const [theme, setTheme] = useState(site.theme || "dark");
    const [layout, setLayout] = useState(site.layout || "column");
    const [progress, setProgress] = useState(false);
    
    const router = useRouter();

    const handleUpdateSite = async () => {
        setProgress(true);
        const res = await fetch(`/api/sites/${site.id}`, {
            method: "PATCH",
            body: JSON.stringify({
                name,
                description,
                logo,
                image,
                analytics_code: analyticsCode,
                theme,
                layout
            })
        });
        
        if (res.ok) {
            router.push(`/sites/${site.id}`);
            router.refresh();
        }
        setProgress(false);
    };

    const handleDeleteSite = async () => {
        setProgress(true);
        const res = await fetch(`/api/sites/${site.id}`, {
            method: "DELETE"
        });
        
        if (res.ok) {
            router.push('/sites');
            router.refresh();
        }
        setProgress(false);
    };

    return (
        <div className="grid gap-4">
            <Card>
                <CardHeader>
                    <CardTitle>Edit Site</CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="My Awesome Site"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="A brief description of your site"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="logo">Logo URL</Label>
                            <Input
                                id="logo"
                                value={logo}
                                onChange={(e) => setLogo(e.target.value)}
                                placeholder="https://example.com/logo.png"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="image">Cover Image URL</Label>
                            <Input
                                id="image"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                placeholder="https://example.com/cover.png"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="analytics">Analytics Code</Label>
                            <Input
                                id="analytics"
                                value={analyticsCode}
                                onChange={(e) => setAnalyticsCode(e.target.value)}
                                placeholder="GA-XXXXXXXXXX"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="theme">Theme</Label>
                            <Select value={theme} onValueChange={setTheme}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a theme" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="light">Light</SelectItem>
                                    <SelectItem value="dark">Dark</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="layout">Layout</Label>
                            <Select value={layout} onValueChange={setLayout}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a layout" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="column">Column</SelectItem>
                                    <SelectItem value="grid">Grid</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Site
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your
                                    site and all associated links.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDeleteSite}>
                                    {progress && <PieChart className="mr-2 h-4 w-4 animate-spin" />}
                                    Delete
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

                    <Button onClick={handleUpdateSite} disabled={progress}>
                        {progress && <PieChart className="mr-2 h-4 w-4 animate-spin" />}
                        Save Changes
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}; 