'use client'

import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PieChart } from "lucide-react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { useDebounce } from "use-debounce";
import { Link } from "@prisma/client";

export const EditLinkForm = ({ link, siteId }: { link: Link, siteId: string }) => {
    const [title, setTitle] = useState(link.title || "");
    const [description, setDescription] = useState(link.description || "");
    const [longurl, setLongurl] = useState(link.longurl || "");
    const [slug, setSlug] = useState(link.slug || "");
    const [slugAvailable, setSlugAvailable] = useState("ok");
    const [progress, setProgress] = useState(false);
    
    const router = useRouter();
    const [debouncedSlug] = useDebounce(slug, 250);

    useEffect(() => {
        if (debouncedSlug !== link.slug) {
            checkSlugAvailability();
        }
    }, [debouncedSlug]);

    const checkSlugAvailability = async () => {
        if (debouncedSlug.length > 0) {
            setSlugAvailable("checking");
            const response = await fetch("/api/slugs/check", {
                method: "POST",
                body: JSON.stringify({
                    slug: debouncedSlug,
                    subdomain: siteId
                })
            });
            
            if (response.ok) {
                const result = await response.json();
                setSlugAvailable(result.status);
            }
        }
    };

    const handleUpdateLink = async () => {
        setProgress(true);
        const res = await fetch(`/api/sites/${siteId}/links/${link.id}`, {
            method: "PATCH",
            body: JSON.stringify({
                title,
                description,
                longurl,
                slug
            })
        });
        
        if (res.ok) {
            router.push(`/sites/${siteId}/links`);
        }
        setProgress(false);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Edit Link</CardTitle>
            </CardHeader>
            <CardContent>
                <form className="grid w-full max-w-sm items-center gap-4">
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Input
                            type="text"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label htmlFor="longurl">Long URL</Label>
                        <Input
                            type="url"
                            id="longurl"
                            value={longurl}
                            onChange={(e) => setLongurl(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label htmlFor="slug">Slug</Label>
                        <Input
                            type="text"
                            id="slug"
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                        />
                        {slugAvailable !== "ok" && slug !== link.slug && (
                            <div className="text-sm text-red-500 mt-1">
                                This slug is already taken
                            </div>
                        )}
                    </div>
                </form>
            </CardContent>
            <CardFooter>
                <Button 
                    onClick={handleUpdateLink}
                    disabled={progress || (slugAvailable !== "ok" && slug !== link.slug)}
                >
                    {progress && <PieChart className="mr-2 h-4 w-4 animate-spin" />}
                    Update Link
                </Button>
            </CardFooter>
        </Card>
    );
}; 