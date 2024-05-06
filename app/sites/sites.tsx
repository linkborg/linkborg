'use client'

import { Button } from "@/components/ui/button"
import React from "react";
import Navigation from "@/components/navigation";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Site} from "@prisma/client";
import Link from "next/link";
import {Copy, Settings, PlusCircle} from "lucide-react"

export function Sites({initData}:{initData?: Site[]}) {
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
                                    <Card key={`db-card-${item.id}`} className={"flex flex-row items-center text-center"}>
                                        <CardHeader className={"w-full flex flex-row items-center justify-between"}>
                                            <span>{item.name}</span>
                                            <div className={"flex flex-row !m-0"}>
                                                <Link className={"mr-2"} key={`db-settings-${item.id}`} href={`/indexes/${item.subdomain}`}>
                                                    <Settings className={"h-8 w-8 p-2 rounded-full bg-gray-100 hover:bg-gray-300"}/>
                                                </Link>
                                            </div>
                                        </CardHeader>
                                    </Card>
                                )
                            })
                        }
                        <Link href={"/sites/new"}>
                            <Card className={"border border-dashed flex flex-row items-center text-center hover:bg-gray-100"}>
                                <CardHeader>
                                    <div className={"flex flex-row items-center justify-between"}>
                                        <PlusCircle className={"h-8 w-8 mr-4 rounded-full p-1 text-gray-600"} />
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