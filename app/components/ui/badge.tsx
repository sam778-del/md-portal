import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
    "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-normal transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    {
        variants: {
            variant: {
                default: "border-transparent bg-[#e6f9f2] text-[#01BF76]",
                secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
                "accent-yellow": "border-transparent bg-[#fffae6] text-[#FFC900]",
                destructive: "border-transparent bg-[#fee2e2] text-destructive",
                outline: "text-foreground",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    },
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
    value?: string | number
}

function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props}>
            {props.value ? props.value : props.children}
        </div>
    )
}

export { Badge, badgeVariants }
