"use client";

import Papa from "papaparse";
import clsx from "clsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import { useEffect, useId, useMemo, useState } from "react";
import { ScatterPlot } from 'reaviz';

import { Checkbox } from "./checkbox";
import { Input } from "./input";
import { Label } from "./label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  RowData,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, ChevronUp, ExternalLink, Search } from "lucide-react";

//allows us to define custom properties for our columns
declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: "text" | "range" | "select";
  }
}

// const columns: ColumnDef<Item>[] = [
//   {
//     id: "select",
//     header: ({ table }) => (
//       <Checkbox
//         checked={
//           table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
//         }
//         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//         aria-label="Select all"
//       />
//     ),
//     cell: ({ row }) => (
//       <Checkbox
//         checked={row.getIsSelected()}
//         onCheckedChange={(value) => row.toggleSelected(!!value)}
//         aria-label="Select row"
//       />
//     ),
//   },
//   {
//     header: "Keyword",
//     accessorKey: "keyword",
//     cell: ({ row }) => <div className="font-medium">{row.getValue("keyword")}</div>,
//   },
//   {
//     header: "Intents",
//     accessorKey: "intents",
//     cell: ({ row }) => {
//       const intents = row.getValue("intents") as string[];
//       return (
//         <div className="flex gap-1">
//           {intents && intents.map((intent) => {
//             const styles = {
//               Informational: "bg-indigo-400/20 text-indigo-500",
//               Navigational: "bg-emerald-400/20 text-emerald-500",
//               Commercial: "bg-amber-400/20 text-amber-500",
//               Transactional: "bg-rose-400/20 text-rose-500",
//             }[intent];

//             return (
//               <div
//                 key={intent}
//                 className={clsx(
//                   "flex size-5 items-center justify-center rounded text-xs font-medium",
//                   styles,
//                 )}
//               >
//                 {intent.charAt(0)}
//               </div>
//             );
//           })}
//         </div>
//       );
//     },
//     enableSorting: false,
//     meta: {
//       filterVariant: "select",
//     },
//     filterFn: (row, id, filterValue) => {
//       const rowValue = row.getValue(id);
//       return Array.isArray(rowValue) && rowValue.includes(filterValue);
//     },
//   },
//   {
//     header: "Volume",
//     accessorKey: "volume",
//     cell: ({ row }) => {
//       const volume = parseInt(row.getValue("volume"));
//       return new Intl.NumberFormat("en-US", {
//         notation: "compact",
//         maximumFractionDigits: 1,
//       }).format(volume);
//     },
//     meta: {
//       filterVariant: "range",
//     },
//   },
//   {
//     header: "CPC",
//     accessorKey: "cpc",
//     cell: ({ row }) => <div>${row.getValue("cpc")}</div>,
//     meta: {
//       filterVariant: "range",
//     },
//   },
//   {
//     header: "Traffic",
//     accessorKey: "traffic",
//     cell: ({ row }) => {
//       const traffic = parseInt(row.getValue("traffic"));
//       return new Intl.NumberFormat("en-US", {
//         notation: "compact",
//         maximumFractionDigits: 1,
//       }).format(traffic);
//     },
//     meta: {
//       filterVariant: "range",
//     },
//   },
//   {
//     header: "Link",
//     accessorKey: "link",
//     cell: ({ row }) => (
//       <a
//         className="inline-flex items-center gap-1 hover:underline"
//         href={row.getValue("link")}
//         target="_blank"
//       >
//         {row.getValue("link")} <ExternalLink size={12} strokeWidth={2} aria-hidden="true" />
//       </a>
//     ),
//     enableSorting: false,
//   },
// ];

// const items: Item[] = [
//   {
//     id: "1",
//     keyword: "react components",
//     intents: ["Informational", "Navigational"],
//     volume: 2507,
//     cpc: 2.5,
//     traffic: 88,
//     link: "#",
//   },
//   {
//     id: "2",
//     keyword: "buy react templates",
//     intents: ["Commercial", "Transactional"],
//     volume: 1850,
//     cpc: 4.75,
//     traffic: 65,
//     link: "#",
//   },
//   {
//     id: "3",
//     keyword: "react ui library",
//     intents: ["Informational", "Commercial"],
//     volume: 3200,
//     cpc: 3.25,
//     traffic: 112,
//     link: "#",
//   },
//   {
//     id: "4",
//     keyword: "tailwind components download",
//     intents: ["Transactional"],
//     volume: 890,
//     cpc: 1.95,
//     traffic: 45,
//     link: "#",
//   },
//   {
//     id: "5",
//     keyword: "react dashboard template free",
//     intents: ["Commercial", "Transactional"],
//     volume: 4100,
//     cpc: 5.5,
//     traffic: 156,
//     link: "#",
//   },
//   {
//     id: "6",
//     keyword: "how to use react components",
//     intents: ["Informational"],
//     volume: 1200,
//     cpc: 1.25,
//     traffic: 42,
//     link: "#",
//   },
//   {
//     id: "7",
//     keyword: "react ui kit premium",
//     intents: ["Commercial", "Transactional"],
//     volume: 760,
//     cpc: 6.8,
//     traffic: 28,
//     link: "#",
//   },
//   {
//     id: "8",
//     keyword: "react component documentation",
//     intents: ["Informational", "Navigational"],
//     volume: 950,
//     cpc: 1.8,
//     traffic: 35,
//     link: "#",
//   },
// ];

interface Display {
  columns: ColumnDisplay[]
}

interface ColumnDisplay {
  name: string
  type: string
  key: string
  description: string
  filter?: "text" | "range" | "select"
}

export function WikiTable({ source, attribution }: { source: string, attribution?: string }) {
  const sourceDisplay = source.replace(/\.csv$/, '.json');

  const [ display, setDisplay ] = useState<Display>({ columns: [] })
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const [data, setData] = useState<any[]>([])

  async function loadSource() {
    const [ response, displayResponse ] = await Promise.all([
      fetch(`${ 
        process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
      }/data/${ source }`),
      fetch(`${
        process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
      }/data/${ sourceDisplay }`)
    ])
    const [ data, displayData ] = await Promise.all([
      response.text(),
      displayResponse.json()
    ])

    // TODO: type guard displayData

    const displayColumn = Object.fromEntries((displayData as Display).columns.map((column) => [column.key, column]))

    const parsed = Papa.parse(data, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header: string) => header.replace(/\s*\n\s*/g, ' ').trim(),
      transform: (value: string, field: string) => {
        const column = displayColumn[field]
        if (column && column.type === "number") {
          return Number(value.replace(/[^\d\.]/g, ''))
        }
        value = value.trim()
        if (value == '?') return ''
        return value
      }
    })
    setData(parsed.data.slice(1))
    setDisplay(displayData)
  }

  useEffect(() => {
    loadSource()
  }, [])


  const table = useReactTable({
    data,
    columns: display.columns.map((column) => ({
      id: column.name,
      header: column.name,
      accessorKey: column.key ?? column.name,
      cell: ({ row }) => {
        const value = row.getValue(column.name)
        if (column.type === "number" && typeof value === "number") {
          return new Intl.NumberFormat("en-US", {
            notation: "compact",
            maximumFractionDigits: 2,
          }).format(value)
        }
        return value
      },
      meta: {
        filterVariant: column.filter
      }
    })),
    state: {
      sorting,
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), //client-side filtering
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(), // client-side faceting
    getFacetedUniqueValues: getFacetedUniqueValues(), // generate unique values for select filter/autocomplete
    getFacetedMinMaxValues: getFacetedMinMaxValues(), // generate min/max values for range filter
    onSortingChange: setSorting,
    enableSortingRemoval: false
  });

  return (<>
    { data.length > 0 && <TableScatterPlot data={data} /> }
    {/* Filters */}
    <div className="flex flex-wrap gap-3 pb-6">
      { display.columns.filter((c) => c.filter).map((column) => (
        <div key={column.name} className="w-44">
          <Filter column={table.getColumn(column.name)!} />
        </div>
      )) }
    </div>
    <div className="space-y-6 bg-zinc-100 dark:bg-zinc-900 rounded-lg [&>div]:max-h-120 overflow-auto">

      <Table>
        <TableHeader className="sticky top-0 bg-zinc-100 dark:bg-zinc-900">
          {
          table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="bg-zinc-800 border-zinc-700">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="relative h-10 select-none"
                    aria-sort={
                      header.column.getIsSorted() === "asc"
                        ? "ascending"
                        : header.column.getIsSorted() === "desc"
                          ? "descending"
                          : "none"
                    }
                  >
                    {header.isPlaceholder ? null : header.column.getCanSort() ? (
                      <div
                        className={clsx(
                          header.column.getCanSort() &&
                            "flex h-full cursor-pointer select-none items-center justify-between gap-2",
                        )}
                        onClick={header.column.getToggleSortingHandler()}
                        onKeyDown={(e) => {
                          // Enhanced keyboard handling for sorting
                          if (header.column.getCanSort() && (e.key === "Enter" || e.key === " ")) {
                            e.preventDefault();
                            header.column.getToggleSortingHandler()?.(e);
                          }
                        }}
                        tabIndex={header.column.getCanSort() ? 0 : undefined}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: (
                            <ChevronUp
                              className="shrink-0 opacity-60"
                              size={16}
                              strokeWidth={2}
                              aria-hidden="true"
                            />
                          ),
                          desc: (
                            <ChevronDown
                              className="shrink-0 opacity-60"
                              size={16}
                              strokeWidth={2}
                              aria-hidden="true"
                            />
                          ),
                        }[header.column.getIsSorted() as string] ?? (
                          <span className="size-4" aria-hidden="true" />
                        )}
                      </div>
                    ) : (
                      flexRender(header.column.columnDef.header, header.getContext())
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="max-h-60 overflow-auto">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={display.columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
    { attribution && (
      <div className="text-sm text-right py-1 text-zinc-500">
        <a href={attribution} target="_blank" rel="noopener noreferrer">Source: Wikipedia</a>
      </div>
    )}
  </>);
}

function TableScatterPlot({ data }: { data: Array<Record<string, unknown>> }) {
  // TODO: bin data by year and take average
  const dataPoints = data.map((d) => {
    // console.log(d)
    if (typeof d['Year'] === 'string' && typeof d['Transistor count'] === 'number') {
      const value = d['Transistor count']
      if (isFinite(value)) {
        return { key: new Date(d['Year'] + '-01-01'), data: value }
      }
    }
    else return null;
  }).filter((d) => d !== null) as Array<{ key: Date, data: number }>;

  // console.log(dataPoints);
  return <ScatterPlot data={dataPoints} height={ 400 } />
}

function Filter({ column }: { column: Column<any, unknown> }) {
  const id = useId();
  const columnFilterValue = column.getFilterValue();
  const { filterVariant } = column.columnDef.meta ?? {};
  const columnHeader = typeof column.columnDef.header === "string" ? column.columnDef.header : "";
  const sortedUniqueValues = useMemo(() => {
    if (filterVariant === "range") return [];

    // Get all unique values from the column
    const values = Array.from(column.getFacetedUniqueValues().keys());

    // If the values are arrays, flatten them and get unique items
    const flattenedValues = values.reduce((acc: string[], curr) => {
      if (Array.isArray(curr)) {
        return [...acc, ...curr];
      }
      return [...acc, curr];
    }, []);

    // Get unique values and sort them
    return Array.from(new Set(flattenedValues)).sort();
  }, [column.getFacetedUniqueValues(), filterVariant]);

  if (filterVariant === "range") {
    return (
      <div className="space-y-2">
        <Label className="text-zinc-500 text-sm">{columnHeader}</Label>
        <div className="flex">
          <Input
            id={`${id}-range-1`}
            className="flex-1 rounded-e-none [-moz-appearance:_textfield] focus:z-10 [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
            value={(columnFilterValue as [number, number])?.[0] ?? ""}
            onChange={(e) =>
              column.setFilterValue((old: [number, number]) => [
                e.target.value ? Number(e.target.value) : undefined,
                old?.[1],
              ])
            }
            placeholder="Min"
            type="number"
            aria-label={`${columnHeader} min`}
          />
          <Input
            id={`${id}-range-2`}
            className="-ms-px flex-1 rounded-s-none [-moz-appearance:_textfield] focus:z-10 [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
            value={(columnFilterValue as [number, number])?.[1] ?? ""}
            onChange={(e) =>
              column.setFilterValue((old: [number, number]) => [
                old?.[0],
                e.target.value ? Number(e.target.value) : undefined,
              ])
            }
            placeholder="Max"
            type="number"
            aria-label={`${columnHeader} max`}
          />
        </div>
      </div>
    );
  }

  if (filterVariant === "select") {
    return (
      <div className="space-y-2">
        <Label className="text-zinc-500 text-sm" htmlFor={`${id}-select`}>{columnHeader}</Label>
        <Select
          value={columnFilterValue?.toString() ?? "all"}
          onValueChange={(value) => {
            column.setFilterValue(value === "all" ? undefined : value);
          }}
        >
          <SelectTrigger id={`${id}-select`}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {sortedUniqueValues.map((value) => (
              <SelectItem key={String(value)} value={String(value)}>
                {String(value)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Label className="text-zinc-500 text-sm" htmlFor={`${id}-input`}>{columnHeader}</Label>
      <div className="relative">
        <Input
          id={`${id}-input`}
          className="peer ps-9"
          value={(columnFilterValue ?? "") as string}
          onChange={(e) => column.setFilterValue(e.target.value)}
          placeholder={`Search ${columnHeader.toLowerCase()}`}
          type="text"
        />
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
          <Search size={16} strokeWidth={2} />
        </div>
      </div>
    </div>
  );
}