'use client'
import { motion } from 'motion/react'

// Static sections
import { IntroSection } from '@/components/section/intro'
import { ContactSection } from '@/components/section/contact'

// Dynamically generated sections
import { FloatSection } from './section/floats'
import { LessonSection } from './section/lessons'
import { FloatingPointTheorems } from './section/theorems'

import { SectionList } from '@/components/section/list'
import { SectionListBox } from '@/components/section/listbox'
import lessons from '@/data/lessons'
import theorems from '@/data/theorems'
import formats from '@/data/formats'

export default function HomePage() {
    return (
        <motion.main className="space-y-24" variants={{
            hidden: { opacity: 0 },
            visible: {
                opacity: 1,
                transition: {
                    staggerChildren: 0.1
                }
            },
        }} initial="hidden" animate="visible">
            <IntroSection/>
            <SectionList { ...lessons }/>
            <SectionListBox { ...formats }/>
            <SectionListBox { ...theorems }/>
            <ContactSection title="Contact" sections={[
                {
                    title: 'GitHub',
                    description: 'GitHub repository',
                    link: 'https://github.com/keshavsaharia/numbers'
                }
            ]}/>
        </motion.main>
    )
}
