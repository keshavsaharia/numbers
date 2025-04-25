'use client'

import { TextLoop } from '@/components/ui/text-loop'
import { ThemeSwitch } from './theme-switch'

/**
 * Footer on every page
 * @returns 
 */
export function Footer() {
    return (
        <footer className="mt-24 border-t border-zinc-100 px-0 py-4 dark:border-zinc-800">
            <div className="flex items-center justify-between">
                <TextLoop className="text-xs text-zinc-500">
                    <span>Maintained by <a className="underline" href="https://keshav.is">Keshav Saharia</a>.</span>
                    <span>Open source on <a className="underline" href="https://github.com/keshavsaharia/numbers">GitHub</a>.</span>
                </TextLoop>
                <div className="text-xs text-zinc-400">
                    <ThemeSwitch />
                </div>
            </div>
        </footer>
    )
}
