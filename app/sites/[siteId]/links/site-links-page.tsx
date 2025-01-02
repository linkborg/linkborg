'use client'

import { Button } from "@/components/ui/button"
import React from "react";
import Navigation from "@/components/navigation";
import Link from "next/link";
import {Link as SiteLink, Site} from "@prisma/client"
import {LinksList} from "@/app/links/links-list";

export function SiteLinks({initData, activeSite}:{initData: SiteLink[], activeSite: Site}) {

	return (
		<>
			<div className="flex items-center justify-between">
				<h1 className="text-lg font-semibold md:text-2xl">Links</h1>
				<div className={"block md:hidden"}><Navigation/></div>
			</div>
			{
				initData?.length === 0 ? (
					<div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
						<div className="flex flex-col items-center gap-1 text-center">
							<h3 className="text-2xl font-bold tracking-tight">
								You have no links
							</h3>
							<p className="text-sm text-muted-foreground">
								Get started by creating a link.
							</p>
							<Link href={`/sites/${activeSite.id}/links/new`} className={"mt-4"}>
								<Button>Create Link</Button>
							</Link>
						</div>
					</div>
				) : (
					<div className="w-full">
						<LinksList initData={initData} useSiteId={activeSite.id} />
					</div>
				)
			}
		</>
	)
}