"use client"

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../form"

import { Textarea } from "@/app/components/ui/textarea"
import { cn } from "@/lib/utils"
import { type Control, type FieldValues, type Path } from "react-hook-form"

type IProps<T extends FieldValues> = {
    name: Path<T>

    label: string
    control: Control<T>
    className?: string
    helpText?: string
    placeholder?: string
    inputClassName?: string
    labelClassName?: string
}

const FormTextArea = <T extends FieldValues>({
    name,
    label,
    helpText,
    placeholder,
    control,
    className,
    inputClassName,
    labelClassName,
}: IProps<T>) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className={cn(className)}>
                    {label && <FormLabel className={cn("", labelClassName)}>{label}</FormLabel>}
                    <FormControl>
                        <Textarea
                            placeholder={placeholder}
                            className={cn("h-full resize-none", inputClassName)}
                            {...field}
                        />
                    </FormControl>
                    {helpText && <FormDescription>{helpText}</FormDescription>}
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export default FormTextArea
