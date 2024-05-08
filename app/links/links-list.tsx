'use client'

import { Button } from "@/components/ui/button"
import React from "react";
import Navigation from "@/components/navigation";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Site} from "@prisma/client";
import Link from "next/link";
import {Link as SiteLink} from "@prisma/client"
import {Copy, Settings, PlusCircle, ListFilter, MoreHorizontal} from "lucide-react"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {
	DropdownMenu, DropdownMenuCheckboxItem,
	DropdownMenuContent, DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import { Badge } from "@/components/ui/badge"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import {formatDate} from "@/lib/utils";


export function LinksList({initData, siteId}:{initData: SiteLink[], siteId: string}) {
	return (
		<>
			<Tabs defaultValue="active">
				<div className="flex items-center">
					<TabsList>
						<TabsTrigger value="active">Active</TabsTrigger>
						{/*<TabsTrigger value="draft">Draft</TabsTrigger>*/}
						{/*<TabsTrigger value="archive">Archived</TabsTrigger>*/}
					</TabsList>
					<div className="ml-auto flex items-center gap-2">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="outline" size="sm" className="h-8 gap-1">
									<ListFilter className="h-3.5 w-3.5"/>
									<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                        Filter
                                      </span>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuLabel>Filter by</DropdownMenuLabel>
								<DropdownMenuSeparator/>
								<DropdownMenuCheckboxItem checked>
									Active
								</DropdownMenuCheckboxItem>
								<DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
								<DropdownMenuCheckboxItem>
									Archived
								</DropdownMenuCheckboxItem>
							</DropdownMenuContent>
						</DropdownMenu>
						<Link href={`/sites/${siteId}/links/new`}>
							<Button size="sm" className="h-8 gap-1">
								<PlusCircle className="h-3.5 w-3.5"/>
								<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                Add Link
                            </span>
							</Button>
						</Link>
					</div>
				</div>
				<TabsContent value="active">
					<Card x-chunk="dashboard-06-chunk-0">
						<CardHeader>
							<CardTitle>Active Links</CardTitle>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Title</TableHead>
										<TableHead className="hidden sm:table-cell">URL</TableHead>
										<TableHead className="hidden sm:table-cell">Created</TableHead>
										<TableHead className="hidden md:table-cell">Clicks</TableHead>
										<TableHead className="text-right"></TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{
										initData.map((item) => (
											<TableRow key={`link-list-key-${item.id}`}>
												<TableCell>
													<div className="font-medium">{item.title}</div>
												</TableCell>
												<TableCell>
													<div className="font-medium">
														https://{item.siteId}.{process.env.NEXT_PUBLIC_SITE_DOMAIN}/{item.slug}
													</div>
													<div className="text-sm">
														{item.longurl}
													</div>
												</TableCell>
												<TableCell className="hidden sm:table-cell">
													{formatDate(item.createdAt.toString())}
												</TableCell>
												<TableCell className="hidden md:table-cell">{item.visits}</TableCell>
												<TableCell className="text-right">
													<DropdownMenu>
														<DropdownMenuTrigger asChild>
															<Button
																aria-haspopup="true"
																size="icon"
																variant="ghost"
															>
																<MoreHorizontal className="h-4 w-4" />
																<span className="sr-only">Toggle menu</span>
															</Button>
														</DropdownMenuTrigger>
														<DropdownMenuContent align="end">
															<DropdownMenuLabel>Actions</DropdownMenuLabel>
															<DropdownMenuItem>Edit</DropdownMenuItem>
															<DropdownMenuItem>Delete</DropdownMenuItem>
														</DropdownMenuContent>
													</DropdownMenu>
												</TableCell>
											</TableRow>
										))
									}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="draft">
					<Card x-chunk="dashboard-06-chunk-0">
						<CardHeader>
							<CardTitle>Draft Links</CardTitle>
						</CardHeader>
						<CardContent>
							Hey
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="archive">
					<Card x-chunk="dashboard-06-chunk-0">
						<CardHeader>
							<CardTitle>Archived Links</CardTitle>
						</CardHeader>
						<CardContent>
							Hey
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</>
	)
}