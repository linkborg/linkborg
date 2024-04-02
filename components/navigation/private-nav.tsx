"use client"

import Link from "next/link";
import React from "react";
import {Button} from "@/components/ui/button";

import { usePathname } from 'next/navigation'
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {LogoutButton} from "@/components/common/logout-button";


export default function PrivateNav () {
    return (
        <>
            <div className="h-full hidden md:block border-r bg-muted/40">
                <PrivateNavEl />
            </div>
            <Sheet>
                <SheetTrigger  asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0 md:hidden"
                    >
                        {/*<HamburgerMenuIcon className="h-6 w-6" />*/}
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="flex flex-col p-0">
                    <PrivateNavEl />
                </SheetContent>
            </Sheet>
        </>
    )
}


function PrivateNavEl() {
    
    const pathname = usePathname()
    
    return (
        <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                <Link href="/" className="flex items-center gap-2 font-semibold">
                    {/*<AngleIcon className="h-5 w-5 -rotate-[65deg] mb-1"/>*/}
                    <span>vectorize.sh</span>
                </Link>
                <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                    {/*<BellIcon className="h-4 w-4"/>*/}
                    <span className="sr-only">Toggle notifications</span>
                </Button>
            </div>
            <div className="flex-1">
                <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                    <Link
                        href="/dashboard"
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${pathname.startsWith('/dashboard') ? "bg-muted text-primary" : "text-muted-foreground"}`}
                    >
                        {/*<HomeIcon className="h-4 w-4"/>*/}
                        Dashboard
                    </Link>
                    <Link
                        href="/sites"
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${pathname.startsWith('/indexes') ? "bg-muted text-primary" : "text-muted-foreground"}`}
                    >
                        {/*<StackIcon className="h-4 w-4"/>*/}
                        Sites {" "}
                    </Link>
                </nav>
            </div>
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4 mb-8">
                <Link
                    href="/settings"
                    className={`flex items-center gap-3 mb-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${pathname.startsWith('/settings') ? "bg-muted text-primary" : "text-muted-foreground"}`}
                >
                    {/*<GearIcon className="h-4 w-4"/>*/}
                    Settings
                </Link>
                <LogoutButton />
            </nav>
        </div>
    )
}

