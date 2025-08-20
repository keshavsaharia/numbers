'use client'
import { motion } from 'motion/react'

// Static sections
import { IntroSection } from '@/components/section/intro'
import { ContactSection } from '@/components/section/contact'

import { SectionList } from '@/components/section/list'
import { SectionListBox } from '@/components/section/listbox'
import lessons from '@/data/lessons'
import theorems from '@/data/theorems'
import formats from '@/data/formats'
import guides from '@/data/guides'

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
            <SectionListBox { ...guides }/>
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
