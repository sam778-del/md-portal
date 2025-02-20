"use client"

import { type ReactElement } from "react"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../select"
import { cn } from "@/lib/utils"
import { type Control, type FieldValues, type Path } from "react-hook-form"

export type SelectOption = {
    label: string
    value: string
    desc?: string
    icon?: ReactElement
    style?: React.CSSProperties
}

interface IProps<T extends FieldValues> {
    name: Path<T>
    control: Control<T>
    label?: string
    placeholder?: string
    className?: string
    helpText?: string
    options: SelectOption[]
    disabled?: boolean
    onChange?: (value: string) => void
}

const FormSelect = <T extends FieldValues>({
    name,
    label,
    helpText,
    placeholder,
    control,
    options,
    disabled,
    className,
    onChange,
}: IProps<T>) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="w-full">
                    {label && <FormLabel>{label}</FormLabel>}
                
                        <Select
                            onValueChange={(value) => {
                                field.onChange(value)
                                if (onChange) onChange(value)
                            }}
                            value={field.value}
                            disabled={disabled}
                        >
                            <FormControl>
                                <SelectTrigger
                                    className={cn("", className)}
                                    style={{ ...(options.find((el) => el.value === field.value)?.style ?? {}) }}
                                >
                                    <SelectValue placeholder={placeholder ?? "Select One"} />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent position="item-aligned" className="z-[1200]">
                                {options?.map((option) => (
                                    <SelectItem
                                        key={option.value}
                                        value={option.value}
                                        className="mt-1"
                                        style={{ ...option.style }}
                                    >
                                        <div className="flex items-center gap-1">
                                            {option.icon} {option.label}
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    
                    {helpText && <FormDescription>{helpText}</FormDescription>}

                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export default FormSelect
