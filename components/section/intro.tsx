import { motion } from 'motion/react'
import { TRANSITION_SECTION, VARIANTS_SECTION } from './constants'

export function IntroSection() {
    return (
        <motion.section variants={VARIANTS_SECTION} transition={TRANSITION_SECTION}>
        <div className="flex-1">
            <p className="text-zinc-600 dark:text-zinc-400">
                Programmers use numbers every day, but the precision and limitations of those numbers is often
                considered an esoteric topic. This is a free and <a className="border-b" href="https://github.com/keshavsaharia/numbers">open-source</a> guide 
                to binary representations, numerical analysis, floating point numbers, and character encodings that is designed to be approachable by a wider audience.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 mt-8">
                This is essential information for software developers, but particularly for those working on the internals of LLMs, machine learning systems, and database technology. You can safely use any of the code and information on this website in any commercial setting without any <a className="border-b" href="https://github.com/keshavsaharia/numbers">licensing</a> requirements.
            </p>
        </div>
      </motion.section>
    )
}