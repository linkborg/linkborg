"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {signIn} from "next-auth/react";
import {LoopIcon, PieChartIcon} from "@radix-ui/react-icons";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function LoginButton({ className, ...props }: UserAuthFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    
    const email = "xprilion@gmail.com";
    
    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <Button disabled={isLoading} onClick={() => { setIsLoading(true); signIn("email", {email, redirect: false})}} type={"submit"}>
                {isLoading && (
                    <PieChartIcon className="mr-2 h-4 w-4 animate-spin" />
                )}
                Get Started
            </Button>
        </div>
    )
}