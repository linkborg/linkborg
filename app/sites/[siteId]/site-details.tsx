'use client'

import {Button} from "@/components/ui/button"
import React from "react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {
    DropdownMenu, DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem, DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Code, Copy, Droplets, Eye, File, ListFilter, Menu, PieChart, PlusCircle, Redo, Rocket} from "lucide-react";
import copyTextToClipboard from "copy-text-to-clipboard";
import Link from "next/link";
import Navigation from "@/components/navigation";
import {Site} from "@prisma/client";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Input} from "@/components/ui/input";
import {formatDate} from "@/lib/utils";
import {LinksList} from "@/app/links/links-list";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {SitePreview} from "@/app/sites/[siteId]/site-preview";

export function SiteDetails({initData}: { initData: any }) {
    return (
        <>
            <div className="flex flex-row items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Site Details</h1>
                <div className={"flex flex-row"}>
                    <Sheet>
                        <SheetTrigger  asChild>
                            <Button size={"sm"} className="h-8 mr-2 gap-2 block md:hidden" variant={"outline"}>
                                <Eye className="h-4 w-4"/>
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                    Preview
                                </span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="flex flex-col h-full items-center p-0 mr-4 mt-4 bg-transparent border-0">
                            <SitePreview initData={initData} />
                        </SheetContent>
                    </Sheet>
                    <div className={"block md:hidden"}><Navigation/></div>
                </div>
            </div>
            <main className="flex-1 items-start p-4 sm:px-6 sm:py-0 md:gap-8">
                <div className={"flex flex-row flex-grow gap-4 items-start justify-between"}>
                    <div className={"flex-1 flex-col p-0"}>
                        <Card className={"mb-8"}>
                        <CardHeader className="space-y-0 p-4 flex flex-row items-start bg-muted/50">
                            <div className="grid gap-0.5">
                                <CardTitle className="group flex items-center gap-2 text-lg">
                                    <Link className={"text-blue-500"} key={`app-key-${initData?.id}-chat`} target={"_blank"} href={`https://${initData?.id}.${process.env.NEXT_PUBLIC_SITE_DOMAIN}`}>
                                        {initData?.subdomain}.{process.env.NEXT_PUBLIC_SITE_DOMAIN}
                                    </Link>
                                    <Button
                                        size="icon"
                                        variant="outline"
                                        className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                                    >
                                        <Copy className="h-3 w-3" onClick={() => copyTextToClipboard(initData?.subdomain + "." + process.env.NEXT_PUBLIC_SITE_DOMAIN)}/>
                                        <span className="sr-only">Copy Site ID</span>
                                    </Button>
                                </CardTitle>
                            </div>
                            <div className="ml-auto flex items-center gap-1">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button size="icon" variant="outline" className="h-8 w-8">
                                            <Menu className="h-3.5 w-3.5"/>
                                            <span className="sr-only">More</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>Edit</DropdownMenuItem>
                                        <DropdownMenuItem>Export</DropdownMenuItem>
                                        <DropdownMenuSeparator/>
                                        <DropdownMenuItem>Delete</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6 py-4 text-sm">
                            <div className="grid gap-3">
                                <ul className="grid gap-3">
                                    <li className="flex items-center justify-between">
                                        <span className="text-muted-foreground">Description</span>
                                        <span>{initData?.description}</span>
                                    </li>
                                    <li className="flex items-center justify-between">
                                        <span className="text-muted-foreground">Cover Image</span>
                                        <span>{initData?.image}</span>
                                    </li>
                                    <li className="flex items-center justify-between">
                                        <span className="text-muted-foreground">Custom Domain</span>
                                        <span>{initData?.customDomain}</span>
                                    </li>
                                </ul>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                            <div className="text-xs text-muted-foreground">
                                Created: {formatDate(initData.createdAt.toString())}
                            </div>
                        </CardFooter>
                    </Card>
                        <LinksList initData={initData.links} useSiteId={initData.id} />
                    </div>
                    <div className={"hidden md:block h-full"}>
                        <SitePreview initData={initData} />
                    </div>
                </div>
            </main>
        </>
    )
}
