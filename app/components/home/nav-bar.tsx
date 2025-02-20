"use client"

import React, { type FC } from "react"
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from "../ui/select"
import { Button } from "../ui/button"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { X } from "lucide-react"
import { applicationSearchParams } from "@/validators/application"
import { useQueryStates } from "nuqs"

interface IProps {
    assignees: string[]
}

const Navbar: FC<IProps> = ({ assignees }) => {
    const [{ myApplications, assignee, status }, setParams] = useQueryStates(applicationSearchParams, {
        shallow: false,
    })

    const t = useTranslations('navbar');

    return (
        <div className="flex border-b">
            <div className="grid w-full max-w-72 place-items-center bg-[#00002D] py-5">
                <Image
                    alt=".Vizo"
                    src={"/assets/brand/logo.svg"}
                    height={45}
                    width={132}
                    priority
                    loading="eager"
                    quality={100}
                />
            </div>

            <div className="flex flex-1 items-center justify-between px-6 py-5">
                <div className="space-y-0.5">
                    <h4 className="text-xl font-semibold">Dr. Sarah Mitchell</h4>
                    <p className="text-sm font-normal text-muted-foreground">Neurologist</p>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant={myApplications ? "default" : "outline"}
                        onClick={() => setParams({ myApplications: !myApplications })}
                    >
                        My Applications
                    </Button>

                    <Select onValueChange={(value) => setParams({ assignee: value })} value={assignee ?? ""}>
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder="Assignees" />
                        </SelectTrigger>
                        <SelectContent>
                            {assignees.map((assignee) => (
                                <SelectItem value={assignee} key={assignee}>
                                    {assignee}
                                </SelectItem>
                            ))}

                            <SelectSeparator />
                            <Button
                                className="w-full px-2"
                                size="sm"
                                variant="ghost"
                                onClick={() => setParams({ assignee: null })}
                            >
                                <X className="size-4" /> {t('clear')}
                                </Button>
                        </SelectContent>
                    </Select>

                    <Select onValueChange={(value) => setParams({ status: value })} value={status ?? ""}>
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder="Statuses" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="New">New</SelectItem>
                            <SelectItem value="In Progress">In Progress</SelectItem>
                            <SelectItem value="Requires Clarification">Requires Clarification</SelectItem>
                            <SelectSeparator />
                            <Button
                                className="w-full px-2"
                                size="sm"
                                variant="ghost"
                                onClick={() => setParams({ status: null })}
                            >
                                <X className="size-4" /> {t('clear')}
                            </Button>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    )
}

export default Navbar
