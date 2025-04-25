import Link from 'next/link'
import { Spotlight } from '../ui/spotlight'

export function TableOfContents() {
    return (
        <div className="relative rounded-2xl bg-zinc-300/30 p-[1px] dark:bg-zinc-600/30">
            <Spotlight className="from-zinc-900 via-zinc-800 to-zinc-700 blur-2xl dark:from-zinc-100 dark:via-zinc-200 dark:to-zinc-50" size={64}/>
            <div className="relative h-full w-full rounded-[15px] bg-white p-4 dark:bg-zinc-950">
                <div className="relative flex w-full flex-row justify-between">
                    <div>
                        <h4 className="font-mono dark:text-zinc-100">
                            <Link className="opacity-50 hover:opacity-80 hover:border-b" href="/">number.rest</Link>
                            <span className="opacity-20"> / </span>
                            <Link className="opacity-50 font-normal hover:opacity-80 hover:border-b" href="/format">format</Link>
                            <span className="opacity-20"> / </span>
                            <span className="font-bold">FP4</span>
                        </h4>
                        <p className="text-zinc-500 dark:text-zinc-400">
                            
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}