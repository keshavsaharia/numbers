import theorems from '@/data/theorems'
import { StackingNavbar } from '../navbar/stacking'

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
  } from "@/components/navbar/pagination"
import Link from 'next/link'

export function Theorem({ id }: { id: string }) {
    const theorem = theorems.sections.find((t) => t.path == id)
    const theoremNumber = parseInt(id)
    const threshold = 5

    const firstTheorem = theorems.sections[0]
    const lastTheorem = theorems.sections[theorems.sections.length - 1]


    if (! theorem)
        return <div>not found</div>

    return (
        <div>
            <Pagination>
                <PaginationContent className="gap-0.5 rounded-lg border border-zinc-100 dark:border-zinc-800 p-1">
                    <PaginationItem className='mx-4 font-bold'>
                        <Link href="/theorem">Theorem</Link>
                    </PaginationItem>
                    { id != firstTheorem.path && <PaginationItem>
                        <PaginationPrevious href="#" />
                    </PaginationItem> }
                    { theorems.sections.map((section) => {
                        const sectionNumber = parseInt(section.path)
                        const distance = Math.abs(theoremNumber - sectionNumber)
                        if (distance > threshold) {
                            return null
                        }
                        else if (distance == threshold) {
                            return (
                                <PaginationItem key={ section.path }>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            )
                        }
                        return (
                        <PaginationItem key={ section.path }>
                            <PaginationLink 
                                isActive={ id == section.path }
                                href={ '/theorem/' + section.path }>
                                    { section.path }
                                </PaginationLink>
                        </PaginationItem>)
                    }) }
                    { id != lastTheorem.path && 
                    <PaginationItem>
                        <PaginationNext href="#" />
                    </PaginationItem> }
                </PaginationContent>
            </Pagination>
            <h1 className="text-2xl font-bold mt-12 mb-8">
                {/* <span className="text-lg px-4 py-2 border bg-zinc-100 border-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 rounded-lg mr-4">{ theorem.path }</span> */}
                { theorem.title }
            </h1>
        </div>
    )
}