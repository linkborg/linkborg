'use client'

import { Button } from "@/components/ui/button"
import React from "react";
import Navigation from "@/components/navigation";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Site} from "@prisma/client";
import Link from "next/link";
import {Link as SiteLink} from "@prisma/client"
import {Copy, Settings, PlusCircle, ListFilter} from "lucide-react"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {
	DropdownMenu, DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export function LinksList({initData}:{initData?: SiteLink[]}) {
	return (
		<>
			<Tabs defaultValue="active">
				<div className="flex items-center mt-8">
					<TabsList>
						<TabsTrigger value="active">Active</TabsTrigger>
						<TabsTrigger value="draft">Draft</TabsTrigger>
						<TabsTrigger value="archive">Archived</TabsTrigger>
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
						<Button size="sm" className="h-8 gap-1">
							<PlusCircle className="h-3.5 w-3.5"/>
							<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                    Add Link
                                </span>
						</Button>
					</div>
				</div>
				<TabsContent value="active">
					<Card x-chunk="dashboard-06-chunk-0">
						<CardHeader>
							<CardTitle>Active Links</CardTitle>
						</CardHeader>
						<CardContent>
							Hey
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