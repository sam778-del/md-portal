import { cn } from "@/lib/utils"
import { ArrowUpDown } from "lucide-react"
import { Button } from "./button"
import { type Column } from "@tanstack/react-table"

interface IProps<TData, TValue> {
    className?: string
    column: Column<TData, TValue>
    label: string
}

const ColumnSortButton = <TData, TValue>({ label, className, column }: IProps<TData, TValue>) => {
    return (
        <Button
            className={cn("flex items-center justify-start p-0 text-left", className)}
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
            {label}
            <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
    )
}

export default ColumnSortButton
