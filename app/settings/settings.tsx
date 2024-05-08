'use client'

import { Button } from "@/components/ui/button"
import React, {useState} from "react";
import Navigation from "@/components/navigation";
import {CardContent, CardDescription, CardHeader, CardTitle, Card} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Tabs, TabsTrigger, TabsContent, TabsList} from '@/components/ui/tabs';
import {DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuCheckboxItem, DropdownMenuLabel, DropdownMenuSeparator} from "@/components/ui/dropdown-menu";
import {
    File,
    ListFilter,
    PieChart,
    Redo,
    PlusCircle, Copy, RefreshCw,
} from "lucide-react"
import {ApiKey} from "@prisma/client";
// import {CopyIcon, ExclamationTriangleIcon, PieChartIcon, PlusCircledIcon, ReloadIcon} from "@radix-ui/react-icons";
import copyTextToClipboard from "copy-text-to-clipboard";
import {useRouter} from "next/navigation";

export function Settings({initData}:{initData?: any | null}) {
    
    const [loading, setLoading] = useState(false);
    const [apiKeyData, setApiKeyData] = useState<any>(initData);
    const router = useRouter();
    
    const generateApiKey = async () => {
        setLoading(true);
        const response = await fetch("/api/apikey", {
            method: "POST"
        });
        if(response.ok){
            const data = await response.json()
            setApiKeyData(data);
            setLoading(false);
            router.refresh()
        }
    }
    
    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Settings</h1>
                <div className={"block md:hidden"}><Navigation/></div>
            </div>
            <div className="grid grid-cols-1 gap-4 max-w-2xl">
                <Tabs defaultValue="account">
                    <div className="flex items-center">
                        <TabsList>
                            <TabsTrigger value="account">Account</TabsTrigger>
                            <TabsTrigger value="apikey">API</TabsTrigger>
                            <TabsTrigger value="draft">Custom Domains</TabsTrigger>
                        </TabsList>
                    </div>
                    <TabsContent value="account">
                        <Card x-chunk="dashboard-06-chunk-0">
                            <CardHeader>
                                <CardTitle>Products</CardTitle>
                                <CardDescription>
                                    Manage your products and view their sales performance.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                Hey
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="apikey">
                        {
                            initData?.key && (
                                <div className="flex space-x-2 mb-4">
                                    <Button variant="ghost" disabled={true} className="shrink-0">
                                        API
                                    </Button>
                                    <Input value={initData?.key} readOnly/>
                                    <Button size={"icon"} variant="secondary" className="shrink-0" onClick={(e) => {
                                        e.preventDefault();
                                        copyTextToClipboard(initData.key)
                                    }}>
                                        <Copy className={"h-4 w-4"} />
                                    </Button>
                                </div>
                            )
                        }
                        <Button size={"sm"} onClick={() => generateApiKey()}>
                            {
                                loading ? (<RefreshCw className="mr-2 h-4 w-4 animate-spin" />) : (
                                    <>
                                        { initData?.key ? <RefreshCw className={"mr-2 h-4 w-4"} /> : <PlusCircle className={"mr-2 h-4 w-4"} /> }
                                    </>
                                )
                            }
                            { initData?.key ? "Re-generate API Key" : "Create API Key" }
                        </Button>
                        <br/>
                        <br/>
                        {initData?.key && (
                            <span className={"text-red-500"}>
                              {/*<ExclamationTriangleIcon className={"h-4 w-4 inline-block"} /> Caution: Re-generating API key will revoke earlier key and all applications using it will immediately stop working.*/}
                            </span>
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </>
    )
}
