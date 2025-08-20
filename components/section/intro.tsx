import { motion } from 'motion/react'
import { TRANSITION_SECTION, VARIANTS_SECTION } from './constants'
import { p as Paragraph, a as Link } from '../typography'

export function IntroSection() {
    return (
        <motion.section variants={VARIANTS_SECTION} transition={TRANSITION_SECTION}>
        <div className="flex-1">
            <Paragraph>
                Programmers use numbers every day, but the precision and limitations of those numbers is often
                considered an esoteric topic. This is a free and <Link href="https://github.com/keshavsaharia/numbers">open-source</Link> guide 
                to binary representations, numerical analysis, floating point numbers, and character encodings that is designed to be approachable by a wider audience.
            </Paragraph>
            <Paragraph>
                This is essential information for software developers, but particularly for those working on the internals of LLMs, machine learning systems, and database technology. You can safely use any of the code and information on this website in any commercial setting without any <Link href="https://github.com/keshavsaharia/numbers/blob/master/LICENSE">licensing</Link> requirements.
            </Paragraph>
        </div>
      </motion.section>
    )
}