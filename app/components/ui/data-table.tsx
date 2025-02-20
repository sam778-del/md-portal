"use client"

import * as React from "react"

import {
    type ColumnDef,
    type ColumnFiltersState,
    type SortingState,
    type VisibilityState,
    type Table as TanStackTable,
    type RowSelectionState,
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table"

import { DataTablePagination } from "./data-table-pagination"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]

    hideColumns?: VisibilityState
    showPagination?: boolean

    hideHeaders?: boolean
    emptyView?: React.ReactElement

    getTableInstance?: (table: TanStackTable<TData>) => void
    onRowSelectionChange?: React.Dispatch<React.SetStateAction<TData[]>>
}

export function DataTable<TData, TValue>({
    columns,
    data,
    hideColumns,
    hideHeaders,
    showPagination = true,
    emptyView,
    getTableInstance,
    onRowSelectionChange,
}: DataTableProps<TData, TValue>) {
    const [rowSelection, setRowSelection] = React.useState({})
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [globalFilter, setGlobalFilter] = React.useState<string>("")

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
            columnFilters,
            globalFilter,
        },
        initialState: {
            columnVisibility: hideColumns,
        },
        enableRowSelection: typeof onRowSelectionChange !== "undefined",

        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
    })

    React.useEffect(() => {
        if (hideColumns) {
            setColumnVisibility(hideColumns)
        }
    }, [hideColumns])

    React.useEffect(() => {
        const handleSelectionState = (selections: RowSelectionState) => {
            if (!onRowSelectionChange) return
            onRowSelectionChange((prev) =>
                Object.keys(selections)
                    .map(
                        (key) =>
                            table.getSelectedRowModel().rowsById[key]?.original ??
                            prev.find((row) => (row as unknown as Record<string, string>)._id === key),
                    )
                    .filter((el) => typeof el !== "undefined"),
            )
        }
        handleSelectionState(rowSelection)
    }, [onRowSelectionChange, rowSelection, table])

    React.useEffect(() => {
        if (getTableInstance) getTableInstance(table)
    }, [getTableInstance, table])

    return (
        <div className="space-y-4">
            <div className="overflow-hidden rounded-md border">
                <Table>
                    {!hideHeaders && (
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id} className="">
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id} colSpan={header.colSpan} className="">
                                                <div className="px-2 py-2">
                                                    {header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                              header.column.columnDef.header,
                                                              header.getContext(),
                                                          )}
                                                </div>
                                            </TableHead>
                                        )
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                    )}
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            <div className="px-2 py-2">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </div>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    {emptyView ? emptyView : <>No results.</>}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            {showPagination && <DataTablePagination table={table} />}
        </div>
    )
}
