import { motion } from 'motion/react'
import { TRANSITION_SECTION, VARIANTS_SECTION } from './constants'
import { SocialLink } from '../link/social'

import type { SectionProps } from '../types'

const EMAIL = 'keshav@keshavsaharia.com'

export function ContactSection({ title, sections }: SectionProps) {
    return (
        <motion.section variants={VARIANTS_SECTION} transition={TRANSITION_SECTION}>
            <h3 className="mb-5 text-lg font-medium">
                { title }
            </h3>
            <p className="mb-5 text-zinc-600 dark:text-zinc-400">
                You can contact the author at{' '}
                <a className="underline dark:text-zinc-300" href={`mailto:${EMAIL}`}>
                    {EMAIL}
                </a>
            </p>
            <div className="flex items-center justify-start space-x-3">
                { sections.map(({ link, title }) => (
                    <SocialLink key={ link } link={ link || '#' }>
                        { title }
                    </SocialLink>
                )) }
            </div>
      </motion.section>
    )
}