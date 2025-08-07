import { SectionGroup } from '@/components/types'

export default {
    title: 'Guides',
    description: 'Collections of tutorials and detailed references.',
    base: '/guides',
    sections: [
      {
        title: 'Linear Algebra',
        description: 'A visual and interactive guide to linear algebra.',
        link: '/linalg',
        path: 'linalg'
      },
        {
            title: 'LLMs',
            description: 'Guides on how to use large language models.',
            link: '/llm',
            path: 'llm'
        },
        {
            title: 'Databases',
            description: 'Guides on database internals behind OLAP and OLTP systems.',
            link: '/database',
            path: 'database'
        },
        {
            title: 'Encodings',
            description: 'Comprehensive guide to character encodings, and how to safely implement advanced encoding algorithms like grapheme clustering.',
            link: '/encoding',
            path: 'encoding'
        },
        {
            title: 'Hashing algorithms',
            description: 'Comprehensive list of hasing algorithms with audited implementations.',
            link: '/hash',
            path: 'hash'
        }
    ]
} satisfies SectionGroup