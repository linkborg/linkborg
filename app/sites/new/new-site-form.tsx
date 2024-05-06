'use client'

import { Button } from "@/components/ui/button"
import {useEffect, useState} from "react";
import Navigation from "@/components/navigation";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {ArrowLeft, PieChart} from "lucide-react";
import {useRouter} from "next/navigation";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {Label} from "@/components/ui/label";

export const NewSiteForm = ({initData}:{initData?: any}) => {
    const [name, setName] = useState("");
    const [dimensions, setDimensions] = useState(768);
    const [metric, setMetric] = useState("Cosine");
    const [progress, setProgress] = useState(false);
    const router = useRouter();
    const handleIndexCreate = () => {
        setProgress(true);
        fetch("/api/indexes", {
            method: "POST",
            body: JSON.stringify({
                name,
                dimensions,
                metric
            })
        }).then((res) => {
            if (res.ok) {
                const data = res.json().then((index_data) => {
                    router.push("/sites/" + index_data.remoteId)
                });
            }
        }).finally(() => {
            setProgress(false)
        })
    }
    
    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Create Index</h1>
                <div className={"block md:hidden"}><Navigation/></div>
            </div>
            <div className="grid grid-cols-1 gap-4 max-w-2xl">
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Create new index
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className="grid w-full max-w-sm items-center gap-4">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                type={"text"}
                                placeholder="my-new-index"
                                id={"name"}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <Label htmlFor="dimensions">Dimensions</Label>
                            <Input
                                type={"number"}
                                placeholder="768"
                                value={dimensions}
                                onChange={(e) => setDimensions(parseInt(e.target.value))}
                            />
                            <Label htmlFor="metric">Metric</Label>
                            <Select  onValueChange={(v) => setMetric(v)}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a metric" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="Cosine">cosine</SelectItem>
                                        <SelectItem value="Euclid">euclidean</SelectItem>
                                        <SelectItem value="Dot">dot product</SelectItem>
                                        <SelectItem value="Manhattan">manhattan</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </form>
                    </CardContent>
                    <CardFooter className="border-t px-6 py-4">
                        <Button disabled={progress} onClick={() => handleIndexCreate()} type={"button"}>
                            {progress && (
                                <PieChart className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Create
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </>
    )
}
