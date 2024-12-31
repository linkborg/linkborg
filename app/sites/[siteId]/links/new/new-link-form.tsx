'use client'

import { Button } from "@/components/ui/button"
import React, {useEffect, useState} from "react";
import Navigation from "@/components/navigation";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {ArrowLeft, PieChart} from "lucide-react";
import {useRouter} from "next/navigation";

import {Label} from "@/components/ui/label";
import {useDebounce} from "use-debounce";
import {LinksSiteSelector} from "@/app/links/links-site-selector";
import {Site, Link as SiteLink} from "@prisma/client";

export const NewLinkForm = ({initData, sites, activeSite}:{initData?: SiteLink[], sites: Site[], activeSite: Site}) => {
	
	const [linkTitle, setLinkTitle] = useState("Untitled Link");
	const [linkSlug, setLinkSlug] = useState("");
	const [longUrl, setLongUrl] = useState("");
	const [slugAvailable, setSlugAvailable] = useState("will-check")
	
	const [progress, setProgress] = useState(false);
	const router = useRouter();
	
	const [debouncedSlug] = useDebounce(slugAvailable, 250);
	
	useEffect(() => {
		setSlugAvailable("will-check")
		async function fn() {
			if (linkSlug.length > 0) {
				setSlugAvailable("checking")
				const response = await fetch("/api/slugs/check", {
					method: "POST",
					body: JSON.stringify({
						slug: debouncedSlug,
						subdomain: activeSite.subdomain,
					})
				});
				
				if(response.ok){
					const result = await response.json();
					setSlugAvailable(result.status);
				}
				else {
					console.log(await response.text())
				}
			}
		}
		fn();
	}, [linkSlug]);
	
	
	const handleCreateSite = async () => {
		setProgress(true);
		const res = await fetch(`/api/sites/${activeSite.id}/links`, {
			method: "POST",
			body: JSON.stringify({
				title: linkTitle,
				slug: linkSlug,
				longurl: longUrl,
			})
		})
		if(res.ok){
			const data = await res.json();
			router.push(`/sites/${data.subdomain}/links`)
		}
		setProgress(false);
	}
	
	return (
		<>
			<div className="flex items-center justify-between">
				<h1 className="text-lg font-semibold md:text-2xl">Create Link</h1>
				<div className={"block md:hidden"}><Navigation/></div>
			</div>
			<LinksSiteSelector sites={sites} activeSite={activeSite} suffix={"/new"} />
			<div className="grid grid-cols-1 gap-4 max-w-2xl">
				<Card>
					<CardHeader>
						<CardTitle>
							Create new link
						</CardTitle>
					</CardHeader>
					<CardContent>
						<form className="grid w-full max-w-sm items-center gap-4">
							<Label htmlFor="name">Title</Label>
							<Input
								type={"text"}
								placeholder="My New Link"
								id={"title"}
								value={linkTitle}
								onChange={(e) => setLinkTitle(e.target.value)}
							/>
							<div className="mt-2">
								<Label htmlFor="siteSubdomain">Short link</Label>
								<div className="flex flex-row items-center">
									<Label
										htmlFor="linkslug"
										className="font-normal h-10 rounded-md rounded-r-none border border-input border-r-0 bg-background pl-3 pr-1 py-2 text-sm ring-offset-background"
									>
										{activeSite.subdomain + "." + process.env.NEXT_PUBLIC_SITE_DOMAIN + "/"}
									</Label>
									<Input
										className="rounded-l-none border-l-0 pl-0"
								       value={linkSlug}
								       onChange={(e) => setLinkSlug(e.target.value)}
								       id="linkslug"
								       placeholder="linkslug"
									/>
								</div>
							</div>
							<div className="mt-2">
								<Label htmlFor="longUrl">Redirect URL</Label>
								<Input
									type={"text"}
									placeholder="https://longurl.com/long-sub-path"
									id={"longUrl"}
									value={longUrl}
									onChange={(e) => setLongUrl(e.target.value)}
								/>
							</div>
						</form>
					</CardContent>
					<CardFooter className="border-t px-6 py-4">
						<Button disabled={progress || slugAvailable !== "ok"} onClick={() => handleCreateSite()} type={"button"}>
							{progress && (
								<PieChart className="mr-2 h-4 w-4 animate-spin" />
							)}
							Create
						</Button>
						<div className={"ml-4"}>
							{
								slugAvailable === "will-check" && (<></>) ||
								slugAvailable === "checking" && (<>Checking</>) ||
								slugAvailable === "ok" && (<>Short link is available</>) ||
								slugAvailable === "exists" && (<>Short link already exists, try another</>)
							}
						</div>
					</CardFooter>
				</Card>
			</div>
		</>
	)
}
