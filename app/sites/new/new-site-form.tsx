'use client'

import { Button } from "@/components/ui/button"
import {useEffect, useState} from "react";
import Navigation from "@/components/navigation";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {ArrowLeft, PieChart} from "lucide-react";
import {useRouter} from "next/navigation";

import {Label} from "@/components/ui/label";
import {useDebounce} from "use-debounce";

export const NewSiteForm = ({initData}:{initData?: any}) => {
    
    const [siteName, setSiteName] = useState("Untitled Website");
    const [siteSubdomain, setSiteSubdomain] = useState("");
    const [subdomainAvailable, setSubdomainAvailable] = useState("will-check")
    
    const [progress, setProgress] = useState(false);
    const router = useRouter();
    
    const [debouncedSubdomain] = useDebounce(subdomainAvailable, 250);
    
    useEffect(() => {
        setSubdomainAvailable("will-check")
        async function fn() {
            if (siteSubdomain.length > 0) {
                setSubdomainAvailable("checking")
                const response = await fetch("/api/slugs/check", {
                    method: "POST",
                    body: JSON.stringify({
                        slug: debouncedSubdomain,
                    })
                });
                
                if(response.ok){
                    const result = await response.json();
                    setSubdomainAvailable(result.status);
                }
                else {
                    console.log(await response.text())
                }
            }
        }
        fn();
    }, [siteSubdomain]);
    
    
    const handleCreateSite = async () => {
        setProgress(true);
        const res = await fetch("/api/sites", {
            method: "POST",
            body: JSON.stringify({
                name: siteName,
                subdomain: siteSubdomain,
            })
        })
        if(res.ok){
            const data = await res.json();
            router.push(`/sites/${data.subdomain}`)
        }
        setProgress(false);
    }
    
    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Create Site</h1>
                <div className={"block md:hidden"}><Navigation/></div>
            </div>
            <div className="grid grid-cols-1 gap-4 max-w-2xl">
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Create new site
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className="grid w-full max-w-sm items-center gap-4">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                type={"text"}
                                placeholder="my-new-site"
                                id={"name"}
                                value={siteName}
                                onChange={(e) => setSiteName(e.target.value)}
                            />
                            <div className="mt-4">
                                <Label htmlFor="siteSubdomain">Subdomain</Label>
                                <div className="relative">
                                    <div
                                        className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <span className="text-gray-700 dark:text-gray-400">${process.env.NEXT_PUBLIC_SITE_DOMAIN}/</span>
                                    </div>
                                    <Input className="pl-[5.35rem]"
                                       value={siteSubdomain}
                                       onChange={(e) => setSiteSubdomain(e.target.value)}
                                       id="siteSubdomain"
                                       placeholder="mynewsite"
                                    />
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="border-t px-6 py-4">
                        <Button disabled={progress || subdomainAvailable !== "ok"} onClick={() => handleCreateSite()} type={"button"}>
                            {progress && (
                                <PieChart className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Create
                        </Button>
                        <div className={"ml-4"}>
                            {
                                subdomainAvailable === "will-check" && (<></>) ||
                                subdomainAvailable === "checking" && (<>Checking</>) ||
                                subdomainAvailable === "ok" && (<>Site is available</>) ||
                                subdomainAvailable === "exists" && (<>Site already exists, try another</>)
                            }
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </>
    )
}
