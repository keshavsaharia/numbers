import { SectionGroup } from '@/components/types'

export default {
  title: 'Guides',
  description: 'Collections of tutorials and detailed references.',
  base: '/guides',
  sections: [
    {
      title: 'Strings',
      description: 'A deep dive into string encodings and string algorithms for searching, fuzzy matching, regular expressions, and finite automata.',
      link: '/string',
      path: 'string',
    },
    {
      title: 'Linear Algebra',
      description: 'A visual guide to linear algebra, with interactive visualizations to provide intuitive understanding of the underlying concepts.',
      link: '/linalg',
      path: 'linalg',
    },
    // {
    //     title: 'LLMs',
    //     description: 'Guides on how to use large language models.',
    //     link: '/llm',
    //     path: 'llm'
    // },
    {
      title: 'Databases',
      description: 'A collection of deep dives into database internals, to make practical decisions on which open-source database to use.',
      link: '/database',
      path: 'database',
    },
    {
      title: 'Encodings',
      description:
        'Comprehensive guide to character encodings, and how to safely implement advanced encoding algorithms like grapheme clustering.',
      link: '/encoding',
      path: 'encoding',
    },
    {
      title: 'Hashing algorithms',
      description:
        'Comprehensive list of hashing algorithms with audited implementations.',
      link: '/hash',
      path: 'hash',
    },
  ],
} satisfies SectionGroup
