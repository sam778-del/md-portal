"use client"

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import React, { type FC, useEffect } from "react"

import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Form } from "../ui/form"
import FormSelect from "../ui/form/form-select"
import FormTextArea from "../ui/form/form-textarea"
import { applications } from "@/data/application"
import { useForm } from "react-hook-form"
import useViewApplicationModal from "@/hooks/use-view-application-modal"

const ViewApplicationModal = () => {
    const modal = useViewApplicationModal()

    // conditionally send request to server with application id to get application full details
    const application = applications.find((el) => el.applicationId === modal.applicationId)

    const form = useForm({ defaultValues: { status: application?.status, revision: "" } })

    useEffect(() => {
        if (!modal.isOpen) return

        form.setValue("status", application?.status)
    }, [application?.status, form, modal.isOpen])

    if (!application) return null

    return (
        <Dialog open={modal.isOpen} onOpenChange={modal.onClose}>
            <DialogContent className="w-full max-w-3xl gap-3">
                <DialogHeader className="flex flex-row items-center justify-between border-b pb-3">
                    <DialogTitle className="text-2xl text-[#111827]">
                        Application #{application.applicationId}
                    </DialogTitle>
                    <Badge variant="default" className="mr-6">
                        Active
                    </Badge>
                </DialogHeader>
                <Form {...form}>
                    <div className="max-h-[75vh] space-y-5 overflow-auto px-2 pb-2">
                        <p className="text-lg font-medium text-[#111827]">Application Time Log</p>

                        <div className="space-y-4">
                            <ApplicationLog
                                title="2/1/2025 18:00    Customer answered initial form."
                                description="No previous formal diagnosis"
                            />
                            <ApplicationLog title="Current medications" description="None" />
                            <ApplicationLog
                                title="Primary symptoms"
                                description="Difficulty concentrating, procrastination, forgetfulness"
                            />
                            <ApplicationLog
                                title="Symptom duration"
                                description="Difficulty concentrating, procrastination, forgetfulness"
                            />
                            <ApplicationLog title="Symptom duration" description="More than 6 months" />
                            <ApplicationLog
                                title="Impact on daily life"
                                description="Significant impact on work performance and personal relationships"
                            />

                            <FormSelect
                                control={form.control}
                                name="status"
                                label="Change Status"
                                options={[
                                    { label: "New", value: "New" },
                                    {
                                        label: "In Progress",
                                        value: "In Progress",
                                    },
                                    {
                                        label: "Requires Clarification",
                                        value: "Requires Clarification",
                                    },
                                ]}
                            />

                            <FormTextArea control={form.control} name="revision" label="Add Revisions" />
                        </div>
                    </div>
                </Form>

                <DialogFooter>
                    <Button variant="secondary">Close</Button>
                    <Button>Update</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ViewApplicationModal

interface IApplicationLogProps {
    title: string
    description: string
}

const ApplicationLog: FC<IApplicationLogProps> = ({ title, description }) => {
    return (
        <div className="space-y-2.5 rounded-md bg-[#F9FAFB] p-4">
            <p className="text-sm font-medium text-[#374151]">{title}</p>
            <p className="text-base font-normal text-[#4B5563]">{description}</p>
        </div>
    )
}
