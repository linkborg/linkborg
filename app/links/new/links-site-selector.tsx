'use client'

import React from "react";
import {Site} from "@prisma/client"
import Link from "next/link"
import {Card, CardHeader, CardTitle, CardDescription} from "@/components/ui/card"

export function LinksSiteSelector({sites}:{sites: Site[]}) {
	return (
		<>
			<h1 className="text-2xl font-bold">Select a site to create a new link</h1>
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{sites.map((site) => (
					<Link 
						key={`site-card-${site.id}`}
						href={`/sites/${site.id}/links/new`}
						className="cursor-pointer"
					>
						<Card className="hover:bg-muted/50">
							<CardHeader>
								<CardTitle>{site.subdomain}</CardTitle>
								<CardDescription>
									{site.description || `Create a new link for ${site.subdomain}`}
								</CardDescription>
							</CardHeader>
						</Card>
					</Link>
				))}
			</div>
		</>
		
	)
}