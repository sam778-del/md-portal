import { type FC, useMemo } from "react"

import { Badge } from "@/app/components/ui/badge"
import { cn } from "@/lib/utils"

interface IProps {
    className?: string
    value: string
}

const StatusBadge: FC<IProps> = ({ className, value }) => {
    const variant = useMemo(() => {
        switch (value) {
            case "New":
                return "accent-yellow"
            case "In Progress":
                return "default"
            case "Requires Clarification":
                return "destructive"
            default:
                return "outline"
        }
    }, [value])

    return <Badge className={cn("", className)} value={value} title="" variant={variant} />
}

export default StatusBadge
