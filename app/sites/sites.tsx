'use client'

import { Button } from "@/components/ui/button"
import React, { useState } from "react";
import Navigation from "@/components/navigation";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Site} from "@prisma/client";
import Link from "next/link";
import {Copy, Settings, PlusCircle, Trash2} from "lucide-react"

export function Sites({initData}:{initData?: Site[]}) {
    const [sites, setSites] = useState(initData)
    
    const handleDelete = async (siteId: string) => {
        if (confirm("Are you sure you want to delete this site? This will delete all associated links.")) {
            try {
                const response = await fetch(`/api/sites/${siteId}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    setSites(prevSites => prevSites?.filter(site => site.id !== siteId));
                } else {
                    console.error("Failed to delete site");
                }
            } catch (error) {
                console.error("Error deleting site:", error);
            }
        }
    };

    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Sites</h1>
                <div className={"block md:hidden"}><Navigation/></div>
            </div>
            {
                initData?.length === 0 ? (
                    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
                        <div className="flex flex-col items-center gap-1 text-center">
                            <h3 className="text-2xl font-bold tracking-tight">
                                You have no sites
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Get started by creating a Site.
                            </p>
                            <Link href={"/sites/new"} className={"mt-4"}>
                                <Button>Create Site</Button>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center gap-4 text-center">
                        {
                            initData?.map((item: Site) => {
                                return (
                                    <Link key={`site-settings-${item.id}`} href={`/sites/${item.subdomain}`}>
                                        <Card key={`db-card-${item.id}`} className={"flex flex-row items-center text-center transition-all duration-200 hover:shadow-md hover:border-primary/20"}>
                                            <CardHeader className={"w-full flex flex-row items-center justify-between"}>
                                                <span>{item.name}</span>
                                                <div className={"flex flex-row !m-0"}>
                                                    <Link className={"mr-2"} key={`site-new-link-${item.id}`} href={`/sites/${item.subdomain}/links/new`}>
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            className="h-8 w-8"
                                                        >
                                                            <PlusCircle className="h-5 w-5 text-green-700 hover:text-green-600" />
                                                        </Button>
                                                    </Link>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={() => handleDelete(item.id)}
                                                        className="h-8 w-8"
                                                    >
                                                        <Trash2 className="h-5 w-5 text-destructive hover:text-destructive/80" />
                                                    </Button>
                                                </div>
                                            </CardHeader>
                                        </Card>
                                    </Link>
                                )
                            })
                        }
                        <Link href={"/sites/new"}>
                            <Card className={"border border-dashed flex flex-row items-center text-center transition-all duration-200 hover:shadow-md hover:bg-secondary/20"}>
                                <CardHeader>
                                    <div className={"flex flex-row items-center justify-between"}>
                                        <PlusCircle className={"h-8 w-8 mr-4 rounded-full p-1 text-muted-foreground transition-colors hover:text-primary"} />
                                        <span>Create</span>
                                    </div>
                                </CardHeader>
                            </Card>
                        </Link>
                    </div>
                )
            }
        </>
    )
}