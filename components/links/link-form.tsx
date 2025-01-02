'use client'

import { Button } from "@/components/ui/button"
import React, { useEffect, useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { PieChart } from "lucide-react"
import { useRouter } from "next/navigation"
import { Label } from "@/components/ui/label"
import { useDebounce } from "use-debounce"
import { Site, Link as SiteLink } from "@prisma/client"

interface LinkFormProps {
    mode: 'create' | 'edit'
    initialData?: SiteLink
    sites?: Site[]
    activeSite: Site
    suffix?: string
}

export const LinkForm = ({ mode, initialData, sites, activeSite, suffix }: LinkFormProps) => {
    const [title, setTitle] = useState(initialData?.title || "Untitled Link")
    const [slug, setSlug] = useState(initialData?.slug || "")
    const [longurl, setLongurl] = useState(initialData?.longurl || "")
    const [slugAvailable, setSlugAvailable] = useState("will-check")
    const [progress, setProgress] = useState(false)
    
    const router = useRouter()
    const [debouncedSlug] = useDebounce(slug, 250)

    useEffect(() => {
        if (mode === 'edit' && debouncedSlug === initialData?.slug) {
            setSlugAvailable("ok")
            return
        }

        const checkSlug = async () => {
            if (debouncedSlug.length > 0) {
                setSlugAvailable("checking")
                const response = await fetch("/api/slugs/check", {
                    method: "POST",
                    body: JSON.stringify({
                        slug: debouncedSlug,
                        subdomain: activeSite.subdomain,
                    })
                })
                
                if (response.ok) {
                    const result = await response.json()
                    setSlugAvailable(result.status)
                }
            }
        }
        checkSlug()
    }, [debouncedSlug])

    const handleSubmit = async () => {
        setProgress(true)
        const endpoint = mode === 'create' 
            ? `/api/sites/${activeSite.id}/links`
            : `/api/sites/${activeSite.id}/links/${initialData?.id}`
        
        const method = mode === 'create' ? 'POST' : 'PATCH'
        
        const res = await fetch(endpoint, {
            method,
            body: JSON.stringify({
                title,
                slug,
                longurl,
            })
        })

        if (res.ok) {
            router.push(`/sites/${activeSite.id}/links`)
        }
        setProgress(false)
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>
                        {mode === 'create' ? 'Create new link' : 'Edit link'}
                    </CardTitle>
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
                                placeholder="My New Link"
                            />
                        </div>
                        <div>
                            <Label htmlFor="slug">Short link</Label>
                            <div className="flex flex-row items-center">
                                <Label
                                    htmlFor="slug"
                                    className="font-normal h-10 rounded-md rounded-r-none border border-input border-r-0 bg-background pl-3 pr-1 py-2 text-sm ring-offset-background"
                                >
                                    {activeSite.subdomain}.{process.env.NEXT_PUBLIC_SITE_DOMAIN}/
                                </Label>
                                <Input
                                    className="rounded-l-none border-l-0 pl-0"
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value)}
                                    id="slug"
                                    placeholder="linkslug"
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="longurl">Redirect URL</Label>
                            <Input
                                type="url"
                                id="longurl"
                                value={longurl}
                                onChange={(e) => setLongurl(e.target.value)}
                                placeholder="https://longurl.com/long-sub-path"
                            />
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button 
                        onClick={handleSubmit}
                        disabled={progress || slugAvailable !== "ok"}
                    >
                        {progress && <PieChart className="mr-2 h-4 w-4 animate-spin" />}
                        {mode === 'create' ? 'Create' : 'Update'}
                    </Button>
                    <div className="ml-4">
                        {slugAvailable === "will-check" && null}
                        {slugAvailable === "checking" && "Checking"}
                        {slugAvailable === "ok" && "Short link is available"}
                        {slugAvailable === "exists" && "Short link already exists, try another"}
                    </div>
                </CardFooter>
            </Card>
        </>
    )
} 