'use client'
import { motion } from 'motion/react'
import Link from 'next/link'
import { AnimatedBackground } from '@/components/ui/animated-background'
import { SectionLink, SectionProps } from '../types'

import { VARIANTS_SECTION, TRANSITION_SECTION } from './constants' 
import { getUrl } from './util'

export function SectionList({ title, base, sections }: SectionProps) {
    return (
        <motion.section variants={ VARIANTS_SECTION } transition={ TRANSITION_SECTION }>
            { title && <h3 className="mb-3 text-xl font-bold">
                { title }
            </h3> }
            <div className="flex flex-col space-y-0">
                <AnimatedBackground
                    className="h-full w-full rounded-lg bg-zinc-100 dark:bg-zinc-900/80"
                    enableHover
                    transition={{
                        type: 'spring',
                        bounce: 0,
                        duration: 0.2
                    }}>
                    { sections.map(({ link, path, title, description }) => { 
                        const href = getUrl(base, link, path)
                        
                        return (
                            <Link key={ href } className="-mx-3 rounded-xl px-3 py-3" href={ href } data-id={ href }>
                                <div className="flex flex-col space-y-1">
                                    <h4 className="font-semibold dark:text-zinc-100">
                                        { title }
                                    </h4>
                                    <p className="text-zinc-500 dark:text-zinc-400">
                                        { description }
                                    </p>
                                </div>
                            </Link>
                        )}
                    ) }
                </AnimatedBackground>
            </div>
        </motion.section>
    )
}