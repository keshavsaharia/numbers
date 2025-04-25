import { motion } from 'motion/react'
import { TRANSITION_SECTION, VARIANTS_SECTION } from './constants'
import { ProjectVideo } from '@/components/video/video'
import { SectionProps } from '../types'


export function VideoList({ title, sections }: SectionProps) {
    return (
        <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-5 text-lg font-medium">
            { title }
        </h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {sections.map(({ title, description, link, identifier, video }) => (
            <div key={ identifier || link } className="space-y-2">
              { video && <div className="relative rounded-2xl bg-zinc-50/40 p-1 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950/40 dark:ring-zinc-800/50">
                <ProjectVideo src={ video } />
              </div> }
              <div className="px-1">
                <a
                  className="font-base group relative inline-block font-[450] text-zinc-900 dark:text-zinc-50"
                  href={ link }
                  target="_blank"
                >
                  { title }
                  <span className="absolute bottom-0.5 left-0 block h-[1px] w-full max-w-0 bg-zinc-900 transition-all duration-200 group-hover:max-w-full"></span>
                </a>
                <p className="text-base text-zinc-600 dark:text-zinc-400">
                  { description }
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>
    )
}