/* eslint-disable react-hooks/rules-of-hooks */
"use client"

import { type ApplicationType } from "@/types"
import { Button } from "../ui/button"
import { type ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "../ui/data-table-column-header"
import StatusBadge from "../ui/status-badge"
import { format } from "date-fns"
import useViewApplicationModal from "@/hooks/use-view-application-modal"

export const applicationListColumns: ColumnDef<ApplicationType>[] = [
    {
        accessorKey: "applicationId",
        header: ({ column }) => <DataTableColumnHeader column={column} title="VIZO ID" />,
        cell: ({ row }) => <>{`#${row.original.applicationId}`}</>,
    },
    {
        accessorKey: "status",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
        cell: ({ row }) => <StatusBadge value={row.original.status} />,
    },
    {
        accessorKey: "submittedAt",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Submission Date" />,
        cell: ({ row }) => <p className="text-muted-foreground">{format(row.original.submittedAt, "MMM dd, yyyy")}</p>,
    },
    {
        accessorKey: "assignee",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Assigned Doctor" />,
        cell: ({ row }) =>
            row.original.assignee ? (
                <p className="text-muted-foreground">{row.original.assignee}</p>
            ) : (
                <Button size="sm" className="w-full max-w-24 bg-[#FFC900] text-black shadow-none hover:bg-[#FFC900]">
                    Claim
                </Button>
            ),
    },
    {
        header: "Actions",
        cell: ({ row }) => {
            const viewApplicationModal = useViewApplicationModal()
            return (
                <div>
                    <Button
                        variant="ghost"
                        className="bg-transparent text-[#01BF76] hover:text-[#01BF76]"
                        onClick={() => viewApplicationModal.onOpen(row.original.applicationId)}
                    >
                        <svg width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_12_1653)">
                                <g clipPath="url(#clip1_12_1653)">
                                    <path
                                        d="M9.06245 1C6.53745 1 4.51558 2.15 3.0437 3.51875C1.5812 4.875 0.603076 6.5 0.140576 7.61562C0.0374512 7.8625 0.0374512 8.1375 0.140576 8.38437C0.603076 9.5 1.5812 11.125 3.0437 12.4812C4.51558 13.85 6.53745 15 9.06245 15C11.5875 15 13.6093 13.85 15.0812 12.4812C16.5437 11.1219 17.5218 9.5 17.9874 8.38437C18.0906 8.1375 18.0906 7.8625 17.9874 7.61562C17.5218 6.5 16.5437 4.875 15.0812 3.51875C13.6093 2.15 11.5875 1 9.06245 1ZM4.56245 8C4.56245 6.80653 5.03656 5.66193 5.88047 4.81802C6.72438 3.97411 7.86898 3.5 9.06245 3.5C10.2559 3.5 11.4005 3.97411 12.2444 4.81802C13.0883 5.66193 13.5625 6.80653 13.5625 8C13.5625 9.19347 13.0883 10.3381 12.2444 11.182C11.4005 12.0259 10.2559 12.5 9.06245 12.5C7.86898 12.5 6.72438 12.0259 5.88047 11.182C5.03656 10.3381 4.56245 9.19347 4.56245 8ZM9.06245 6C9.06245 7.10313 8.16558 8 7.06245 8C6.84058 8 6.62808 7.9625 6.42808 7.89687C6.2562 7.84062 6.0562 7.94688 6.06245 8.12813C6.07183 8.34375 6.10308 8.55937 6.16245 8.775C6.59058 10.375 8.23745 11.325 9.83745 10.8969C11.4375 10.4688 12.3875 8.82188 11.9593 7.22188C11.6125 5.925 10.4656 5.05312 9.19058 5C9.00933 4.99375 8.90308 5.19062 8.95933 5.36562C9.02495 5.56562 9.06245 5.77812 9.06245 6Z"
                                        fill="#01BF76"
                                    />
                                </g>
                            </g>
                            <defs>
                                <clipPath id="clip0_12_1653">
                                    <rect width="18" height="16" fill="white" transform="translate(0.0625)" />
                                </clipPath>
                                <clipPath id="clip1_12_1653">
                                    <path d="M0.0625 0H18.0625V16H0.0625V0Z" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                        View
                    </Button>
                </div>
            )
        },
    },
]
