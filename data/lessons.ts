import { SectionGroup } from '@/components/types'

export default {
    title: 'Interactive lessons',
    description: 'Learn the fundamentals about how integers and floating point numbers are represented.',
    base: '/learn',
    sections: [
        {
            title: 'Binary integers',
            description: 'An interactive guide to storing natural numbers in a digital computer.',
            link: '/learn/binary',
            path: 'binary'
        },
        {
            title: 'Logic gates',
            description: 'The fundamental building blocks of digital circuits.',
            link: '/learn/logic-gates',
            path: 'logic-gates'
        },
        {
            title: 'Binary arithmetic',
            description: 'A visual guide to binary arithmetic.',
            link: '/learn/arithmetic',
            path: 'arithmetic'
        },
        {
            title: 'Floating point numbers',
            description: 'Learn how floating point numbers are represented in a digital computer.',
            link: '/learn/floats',
            path: 'floats'
        }
    ]
} satisfies SectionGroup