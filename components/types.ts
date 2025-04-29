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
    alias?: string[]       // aliases for content matching
    path?: string          // relative path from group base
    link?: string           // absolute link
    video?: string
    tags?: string[]
}

export interface Reference {
    id: string
    edition?: number | number[]
    year?: number | number[]
    author: string
    title: string
    publisher?: string
    link?: string
    publication?: string
    [key: string]: any
}