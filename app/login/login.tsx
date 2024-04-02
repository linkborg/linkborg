"use client"

import React, {useEffect, useState} from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {signIn, SignInResponse} from "next-auth/react";
import Link from "next/link";
import {Loader2} from "lucide-react";

export default function Login() {
    const [email, setEmail] = useState("")
    const [progress, setProgress] = useState(false);
    const [sentEmail, setSentEmail] = useState(false);
    
    const [isDisabled, setIsDisabled] = useState(false);
    const [countdown, setCountdown] = useState(30);
    
    const handleLoginSubmit = async () => {
        setProgress(true)
        const res = await signIn("email", {email, callbackUrl: "/", redirect:false}) as SignInResponse;
        if(res.ok){
            setIsDisabled(true)
            setProgress(false);
            setSentEmail(true);
        }
    }
    
    const backgroundPosition = 100 - (countdown / 30) * 100;
    
    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        
        if (isDisabled) {
            interval = setInterval(() => {
                setCountdown((currentCountdown) => {
                    if (currentCountdown <= 1) {
                        clearInterval(interval as NodeJS.Timeout);
                        setIsDisabled(false);
                        return 30;
                    } else {
                        return currentCountdown - 1;
                    }
                });
            }, 1000);
        }
        
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isDisabled]);
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-4 min-w-[340px]">
            <Card className="mx-auto max-w-sm min-w-[300px] md:min-w-[340px]">
                <CardHeader>
                    <CardTitle className="text-2xl">
                        <Link href={"https://vectorize.sh"}>vectorize.sh</Link>
                    </CardTitle>
                    <CardDescription>
                        Vectorize, instantly.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <Button
                            disabled={progress || isDisabled} onClick={() => handleLoginSubmit()} type={"submit"}
                        >
                            {progress && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                            )}
                            {sentEmail ? isDisabled ? `Send again in ${countdown}s` : "Send again" : "Send login link"}
                        </Button>
                        {sentEmail && <div className={"text-center w-full text-green-800"}>Magic link sent</div>}
                    </div>
                    <div className="mt-4 text-center text-sm">
                        By logging in, you agree to the T&Cs.
                        <br /><br />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
