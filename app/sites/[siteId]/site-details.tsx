'use client'

import {Button} from "@/components/ui/button"
import React from "react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Code, Copy, Droplets, Rocket} from "lucide-react";
import copyTextToClipboard from "copy-text-to-clipboard";
import Link from "next/link";
import Navigation from "@/components/navigation";
import {Site} from "@prisma/client";

export function SiteDetails({initData}: { initData?: Site }) {
    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Site Details</h1>
                <div className={"block md:hidden"}><Navigation/></div>
            </div>
            <main className="flex-1 items-start p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
                <Card className={"mb-4"}>
                    <CardHeader className="flex flex-row items-start bg-muted/50">
                        <div className="grid gap-0.5">
                            <CardTitle className="group flex items-center gap-2 text-lg">
                                Site ID: {initData?.id}
                                <Button
                                    size="icon"
                                    variant="outline"
                                    className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                                >
                                    <Copy className="h-3 w-3" onClick={() => copyTextToClipboard(initData?.id || "")}/>
                                    <span className="sr-only">Copy Site ID</span>
                                </Button>
                            </CardTitle>
                            <CardDescription>Date: {initData?.createdAt.toTimeString()}</CardDescription>
                        </div>
                        <div className="ml-auto flex items-center gap-1">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button size="icon" variant="outline" className="h-8 w-8">
                                        <Droplets className="h-3.5 w-3.5"/>
                                        <span className="sr-only">More</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                    <DropdownMenuItem>Export</DropdownMenuItem>
                                    <DropdownMenuSeparator/>
                                    <DropdownMenuItem>Trash</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6 text-sm">
                        <div className="grid gap-3">
                            <ul className="grid gap-3">
                                <li className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Status</span>
                                    <span>Active</span>
                                </li>
                                <li className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Dimensions</span>
                                    <span>{initData?.subdomain}</span>
                                </li>
                                <li className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Metric</span>
                                    <span>{initData?.customDomain}</span>
                                </li>
                            </ul>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                        <div className="text-xs text-muted-foreground">
                            Updated: {initData?.updatedAt.toTimeString()}
                        </div>
                    </CardFooter>
                </Card>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center gap-4 text-center">
                    <Link key={`app-key-${initData?.id}-chat`} target={"_blank"} href={`https://${initData?.id}.${process.env.SITE_DOMAIN}`}>
                        <Card className={"border border-dashed hover:bg-green-50"}>
                            <CardHeader className={"flex flex-row items-center text-center"}>
                                <div className={"flex flex-row items-center justify-between"}>
                                    <Rocket className={"h-6 w-6 mr-4 text-gray-600"}/>
                                    <span>{initData?.name}</span>
                                </div>
                            </CardHeader>
                            <CardFooter className={"bg-green-300 text-sm py-2 rounded-b-xl"}>
                                {initData?.updatedAt.toTimeString()}
                            </CardFooter>
                        </Card>
                    </Link>
                    <Link key={`app-key-${initData?.id}-api`} target={"_blank"} href={`https://${initData?.id}.${process.env.SITE_DOMAIN}/swagger`}>
                        <Card className={"border border-dashed hover:bg-blue-50"}>
                            <CardHeader className={"flex flex-row items-center text-center"}>
                                <div className={"flex flex-row items-center justify-between"}>
                                    <Code className={"h-6 w-6 mr-4 text-gray-600"}/>
                                    <span>{initData?.name}</span>
                                </div>
                            </CardHeader>
                            <CardFooter className={"bg-blue-300 text-sm py-2 rounded-b-xl "}>
                                {initData?.updatedAt.toTimeString()}
                            </CardFooter>
                        </Card>
                    </Link>
                </div>
            </main>
        </>
    )
}
