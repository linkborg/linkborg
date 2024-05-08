'use client'

import React from "react";
import {Site} from "@prisma/client"

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import {useRouter} from "next/navigation";

export function LinksSiteSelector({sites, activeSite, suffix}:{sites: Site[], activeSite: Site, suffix?: string}) {
	
	const router = useRouter();
	
	const handleSiteSelectChange = (subdomain: string) => {
		router.push(`/sites/${subdomain}/links${suffix ? "/"+suffix : ""}`);
	}
	
	return (
		<Select value={activeSite.id} onValueChange={(value: string)=> handleSiteSelectChange(value)}>
			<SelectTrigger className="w-[180px]">
				<SelectValue placeholder="Select a site" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Sites</SelectLabel>
					{
						sites.map((site: Site) => {
							return (<SelectItem key={`sites-select-key-${site.id}`} value={site.id}>{site.subdomain}</SelectItem>)
						})
					}
				</SelectGroup>
			</SelectContent>
		</Select>
	)
}