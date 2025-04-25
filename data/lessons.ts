import { SectionGroup } from '@/components/types'

export default {
    title: 'Interactive lessons',
    description: 'Learn the fundamentals about how integers and floating point numbers are represented.',
    base: '/learn',
    sections: [
        {
            title: 'Binary integers',
            description: 'Learn how whole numbers are stored in a digital computer.',
            link: '/learn/binary'
        },
        {
            title: 'Binary arithmetic',
            description: 'A visual guide to binary arithmetic.',
            link: '/learn/arithmetic'
        },
        {
            title: 'Floating point numbers',
            description: 'Learn how floating point numbers are represented in a digital computer.',
            link: '/learn/floats'
        }
    ]
} satisfies SectionGroup