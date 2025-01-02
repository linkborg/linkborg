import { Button } from "@/components/ui/button"
import Navigation from "@/components/navigation";
import Link from "next/link";
import {Card, CardDescription, CardFooter, CardHeader} from "@/components/ui/card";
import React from "react";
import {Rocket} from "lucide-react";
import { formatDate } from "@/lib/utils";

export function Dashboard({stats, popularLinks, popularSites}: {stats: any, popularLinks: any, popularSites: any}) {
    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
                <div className={"block md:hidden"}><Navigation/></div>
            </div>
            {
                stats ? (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <h2 className="text-xl font-semibold">Statistics</h2>
                        </CardHeader>
                        <CardDescription>
                            <p>Total Visits: {stats.totalVisits}</p>
                            <p>Unique Visitors: {stats.uniqueVisitors}</p>
                            <p>Bounce Rate: {stats.bounceRate}%</p>
                        </CardDescription>
                        <CardFooter>
                            <p>Last Updated: {formatDate(stats.lastUpdated)}</p>
                        </CardFooter>
                    </Card>
                    <Card>
                        <CardHeader>
                            <h2 className="text-xl font-semibold">Popular Links</h2>
                        </CardHeader>
                        <CardDescription>
                            <ul>
                                {popularLinks.map((link: any, index: number) => (
                                    <li key={index}>
                                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                                            {link.title} - {link.visits} visits
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </CardDescription>
                    </Card>
                    <Card>
                        <CardHeader>
                            <h2 className="text-xl font-semibold">Popular Sites</h2>
                        </CardHeader>
                        <CardDescription>
                            <ul>
                                {popularSites.map((site: any, index: number) => (
                                    <li key={index}>
                                        <a href={site.url} target="_blank" rel="noopener noreferrer">
                                            {site.name} - {site.visits} visits
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </CardDescription>
                    </Card>
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
