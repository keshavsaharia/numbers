'use client'

import { motion } from 'motion/react'
import { TRANSITION_SECTION, VARIANTS_SECTION } from './constants'
import { Spotlight } from '../ui/spotlight'

import type { SectionLink, SectionProps } from '../types'
import Link from 'next/link'

import { getUrl } from './util'

export function SectionListBox({ title, description, base, sections }: SectionProps) {

    return (
        <motion.section variants={VARIANTS_SECTION} transition={TRANSITION_SECTION}>
            { title && <h3 className="mb-4 mt-8 text-xl font-bold">
                { title }
            </h3> }
            { description && <p className='text-md text-gray-700 dark:text-gray-300 font-normal mb-4'>
                { description }
            </p> }

            <div className="flex flex-col space-y-2">
                { sections.map(({ link, path, title, description, image, identifier, tags }) => {
                    const href = getUrl(base, link, path)
                    
                    return (
                        <Link key={ href } href={ href } 
                            className="relative overflow-hidden rounded-2xl bg-zinc-300/30 p-[1px] dark:bg-zinc-600/30">
                            <Spotlight className="from-zinc-900 via-zinc-800 to-zinc-700 blur-2xl dark:from-zinc-100 dark:via-zinc-200 dark:to-zinc-50" size={64}/>
                            <div className="relative h-full w-full rounded-[15px] bg-white dark:bg-zinc-950 flex flex-col justify-between">
                                <div className="relative flex w-full flex-row justify-between">
                                    { image && <div className="flex-shrink-0 w-28 h-28">
                                        <img src={image} alt={title} className="w-full h-full object-cover rounded-l-lg" />
                                    </div> }
                                    <div className="p-4">
                                        <h4 className="font-semibold dark:text-zinc-100">
                                            { title }
                                        </h4>
                                        <p className="text-zinc-500 dark:text-zinc-400">
                                            { description }
                                        </p>
                                    </div>
                                    <p className="text-zinc-600 dark:text-zinc-400 font-bold opacity-50 text-nowrap">
                                        { identifier }
                                    </p>
                                </div>
                            </div>
                        </Link>
                    )
                }) }
            </div>
        </motion.section>
    )
}