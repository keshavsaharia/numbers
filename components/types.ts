/**
 * Props passed to section viewer
 */
export interface SectionProps {
    title?: string
    base?: string
    sections: SectionLink[]
}

/**
 * A group of sections
 */
export interface SectionGroup {
    title: string           // group title
    description?: string    // group subtitle
    base: string            // base URL
    sections: SectionLink[] // list of section links
}

/**
 * Usually references an MDX page
 */
export interface SectionLink {
    title: string
    description: string
    identifier?: string    // unique identifier
    path?: string          // relative path from group base
    link?: string           // absolute link
    video?: string
    tags?: string[]
}