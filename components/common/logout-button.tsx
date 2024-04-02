"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {useState} from "react";
import {signOut} from "next-auth/react";
import {Loader2} from "lucide-react";

export function LogoutButton() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    
    async function handleLogout() {
        setIsLoading(true)
        await signOut();
    }
    
    return (
        <div className={cn("grid gap-6")}>
            <Button disabled={isLoading} type={"button"} onClick={() => handleLogout()}>
                {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Logout
            </Button>
        </div>
    )
}