import { Button } from "@/components/ui/button"
import Navigation from "@/components/navigation";
import Link from "next/link";
import {Card, CardDescription, CardFooter, CardHeader} from "@/components/ui/card";
import React from "react";
import {Rocket} from "lucide-react";

export function Dashboard({initData} : {initData?: any}) {
    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
                <div className={"block md:hidden"}><Navigation/></div>
            </div>
            {
                initData.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center gap-4 text-center">
                        {initData.map((app: any) => {
                            return (
                                <Link key={`app-key-${app.id}`} target={"_blank"} href={`https://${app.subdomain}.${process.env.NEXT_PUBLIC_SITE_DOMAIN}`}>
                                    <Card className={"border border-dashed hover:bg-secondary/50 transition-all duration-200 hover:shadow-md hover:border-primary"}>
                                        <CardHeader className={"flex flex-row items-center text-center"}>
                                            <div className={"flex flex-row items-center justify-between"}>
                                                <Rocket className={"h-6 w-6 mr-4 text-muted-foreground"} />
                                                <span>{app.name}</span>
                                            </div>
                                        </CardHeader>
                                        <CardFooter className={"bg-primary/20 text-sm py-2 rounded-b-xl"}>
                                            {app.updatedAt.toTimeString()}
                                        </CardFooter>
                                    </Card>
                                </Link>
                            )
                        })}
                    </div>
                ) : (
                    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
                        <div className="flex flex-col items-center gap-1 text-center">
                            <h3 className="text-2xl font-bold tracking-tight">
                                You have no sites
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Create a site to get started
                            </p>
                            <Link href={"/sites/new"}>
                                <Button className="mt-4">Create Site</Button>
                            </Link>
                        </div>
                    </div>
                )
            }
        </>
    )
}
